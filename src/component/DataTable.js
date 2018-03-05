import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import ReactTable from "react-table";
import axios from 'axios';
import treeTableHOC from './TreeTable';

const TreeTable = treeTableHOC(ReactTable);

const defaultPageSize = 20;

class DataTable extends Component {

    pageIndex = 0;
    pageSize = defaultPageSize;
    sorted = [];
    filtered = [];

    state = {
        data: [],
        pages: -1,
        loading: false,
        pageSize: defaultPageSize,
        pageIndex: 0
    };

    willFetchData = false;

    constructor(){
        super();
        this.fetchData = this.fetchData.bind(this);
        this.onFetchData = this.onFetchData.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
    }

    componentDidUpdate(){
        if (this.willFetchData && this._child && this._child.fireFetchData){
            this.willFetchData = false;
            this._child.fireFetchData();
        }
    }

    fetchData(){
        this.willFetchData = true;
    }

    onPageChange(pageIndex){
        this.pageIndex = pageIndex;
    }

    onPageSizeChange(pageSize, pageIndex){
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
    }

    onFetchData(state, instance) {
        var nState = {};
        if (this.mode === 'demo') {
            if (this.props.rawData[this.props.name]){
                if (!this.props.pivotBy){
                    nState.data = this.props.rawData[this.props.name].slice(this.pageIndex * this.pageSize,(this.pageIndex + 1) * this.pageSize);
                }
                else {
                    nState.data = this.props.rawData[this.props.name];
                }
                nState.pages = this.props.pivotBy ? 1 : Math.ceil(this.props.rawData[this.props.name].length / this.pageSize);
            }
            if (nState.data && state.filtered.length > 0){
                var filter = new RegExp(`^${state.filtered[0].value}`);
                nState.data = nState.data.filter(it => it[state.filtered[0].id].match(filter));
            }
            if (nState.data && state.sorted.length > 0){
                nState.data.sort((a,b)=> {
                    if (state.sorted[0].desc){
                        return b[state.sorted[0].id].localeCompare(a[state.sorted[0].id])
                    }
                    else {
                        return a[state.sorted[0].id].localeCompare(b[state.sorted[0].id])
                    }
                })
            }
            nState.loading = false;
            nState.pageSize = this.pageSize;
            nState.pageIndex = this.pageIndex;
            if (typeof this.props.onTableUpdate === 'function') {
                this.props.onTableUpdate(this.props.name, nState);
            }
        }
        else {
            if (!this.props.rawData[this.props.name]){
              this.props.rawData[this.props.name] = [];
            }
            if (this.props.rawData[this.props.name][this.pageIndex] !== void 0 && !this.props.pivotBy &&
                (this.pageSize === this.props.rawData[this.props.name][this.pageIndex].length) &&
                this.sorted === state.sorted &&
                this.filtered === state.filtered) {
                nState.data = this.props.rawData[this.props.name][this.pageIndex];
                nState.pages = Math.ceil(this.props.dataLength / this.pageSize);
                nState.loading = false;
                nState.pageSize = this.pageSize;
                nState.pageIndex = this.pageIndex;
                if (typeof this.props.onTableUpdate === 'function') {
                    this.props.onTableUpdate(this.props.name, nState);
                }
            }
            else {
                axios.post(this.props.url,{
                    offset: (this.pageIndex*this.pageSize),
                    limit: this.pageSize,
                    sorted: state.sorted,
                    filtered: state.filtered
                }).then((res) => {
                    this.sorted = state.sorted;
                    this.filtered = state.filtered;
                    nState.data = res.data;
                    nState.pages = Math.ceil(this.props.dataLength / this.pageSize);
                    nState.loading = false;
                    nState.pageSize = this.pageSize;
                    nState.pageIndex = this.pageIndex;
                    if (typeof this.props.onTableUpdate === 'function') {
                        this.props.onTableUpdate(this.props.name, nState);
                    }
                });
            }
        } 
    }

    getSubLength(subRows){
        return subRows.filter(it=> it._pivotVal !== "null").length;
    }

    render() {
        this.mode = this.props.mode;
        this.pageIndex = this.props.pageIndex || 0;
        this.pageSize = this.props.pageSize || defaultPageSize;
        var expand = {};
        if (this.state.expandIndex){
            expand[this.state.expandIndex] = true;
        }
        if (this.props.pivotBy) {
            return (<Typography component="div" style={{ padding: 8 * 3 }}>
                        <TreeTable
                            pivotBy={this.props.pivotBy}
                            ref={(child) => { this._child = child; }}
                            columns={[
                                {
                                    columns: this.props.fields.map(column => {
                                        var col = {
                                            Header: `${column.accessor}`,
                                            Cell: props => <span>{String(props.value)}</span>,
                                            PivotValue: cellInfo => (
                                                <span style={{color: (cellInfo.isExpanded ? "#8b0000" : "black")}}>
                                                  <span>
                                                  {cellInfo.row._pivotVal} ({this.getSubLength(cellInfo.subRows)})
                                                  </span>
                                                </span>
                                            ),
                                            ...column
                                        };
                                        if (column.aggregate){
                                            col.aggregate = (values, rows) => {
                                                return values[0]
                                            };
                                        }
                                        return col;
                                    })
                                }
                            ]}
                            subHeaders={[
                                {
                                    columns: this.props.subFields.map(column => {
                                        var col = {
                                            Header: `${column.accessor}`,
                                            accessor: `${column.accessor}`,
                                            Cell: props => <span>{String(props.value)}</span>
                                        };
                                        if (column.aggregate){
                                            col.aggregate = (values, rows) => {
                                                return values[0]
                                            };
                                        }
                                        if (column.hasOwnProperty('show')){
                                            col.show = column.show;
                                        }
                                        if (column.hasOwnProperty('minWidth')){
                                            col.minWidth = column.minWidth;
                                        }
                                        return col;
                                    })
                                }
                            ]}
                            filterable={true}
                            pageSize={this.props.pageSize || defaultPageSize}
                            className="-striped -highlight"
                            data={this.props.data || []}
                            page={this.props.pageIndex || 0}
                            pages={this.props.pages || -1}
                            loading={this.props.loading || false}
                            treeTableIndent={30}
                            subRowFilter={(subRows,props) =>{
                                //push only subrows which have no first item null
                                var accessor1 = props.subHeaders[0].columns[0].accessor;
                                var accessor2 = props.subHeaders[0].columns[1].accessor;
                                // eslint-disable-next-line
                                return subRows.filter(it => it[accessor1] != undefined && it[accessor2] != undefined);
                            }}
                            manual
                            SubComponent={(row) => {
                                return (
                                  <div>
                                    You can put any component you want here, even another React Table! You even have access to the row-level data if you need!  Spark-charts, drill-throughs, infographics... the possibilities are endless!
                                  </div>
                                )
                              }}
                            onPageChange={this.onPageChange}
                            onPageSizeChange={this.onPageSizeChange}
                            onFetchData={this.onFetchData}
                        />
                    </Typography>)
        }
        else {
            return (<Typography component="div" style={{ padding: 8 * 3 }}>
                        <ReactTable
                            ref={(child) => { this._child = child; }}
                            columns={[
                                {
                                    columns: this.props.fields.map(column => {
                                        return {
                                            Header: `${column.accessor}`,
                                            Cell: props => <span>{String(props.value)}</span> ,
                                            ...column
                                        }
                                    })
                                }
                            ]}
                            filterable={true}
                            pageSize={this.props.pageSize || defaultPageSize}
                            className="-striped -highlight"
                            data={this.props.data || []}
                            page={this.props.pageIndex || 0}
                            pages={this.props.pages || -1}
                            loading={this.props.loading || false}
                            manual
                            onPageChange={this.onPageChange}
                            onPageSizeChange={this.onPageSizeChange}
                            onFetchData={this.onFetchData}
                        />
                    </Typography>)
        }
    }
}

export default DataTable;