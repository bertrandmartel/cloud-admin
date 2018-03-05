/* eslint-disable */

import React from 'react'
import classnames from 'classnames'
import SubTable from './SubTable.js';

export default (Component) => {
  const wrapper = class RTTreeTable extends React.Component {
    
    constructor(props)
    {
      super(props);
      this.getWrappedInstance.bind(this);
      this.TrComponent.bind(this);
      this.TrGroupComponent.bind(this);
      this.getTrProps.bind(this);
      this.getTrGroupProps.bind(this);
    }

    // this is so we can expose the underlying ReactTable to get at the sortedData for selectAll
    getWrappedInstance = () => {
      if (!this.wrappedInstance) console.warn('RTTreeTable - No wrapped instance');
      if (this.wrappedInstance.getWrappedInstance) return this.wrappedInstance.getWrappedInstance();
      else return this.wrappedInstance
    }

    getHiddenColumn(columns){
      return columns.filter(it => it.hasOwnProperty('show') && !it.show);
    }

    getHiddenColumnByKey(arr, key){
      return arr.filter(it => it.key === key).length === 0;
    }

    getHiddenColumnByAccessor(arr, accessor){
      return arr.filter(it => it.accessor === accessor).length === 0;
    }

    fireFetchData () {
      this.props.onFetchData(this.getWrappedInstance().state, this);
    }

    TrComponent = (props) => {
      const { 
        ri,
        ...rest 
      } = props;

      var columns = this.props.columns[0].columns.map((it,index) => {
        it.key = `${index}-${it.accessor}`;
        return it;
      });
      var hiddenColumn = this.getHiddenColumn(columns);

      if(ri && ri.groupedByPivot) {
        //render the pivot cell
        var pivotCell = props.children[ri.level];
        pivotCell.props.style.paddingLeft = `${this.props.treeTableIndent*ri.level}px`;
        pivotCell.props.style.borderBottom = '1px solid rgba(128,128,128,0.2)';
        var cells = [];
        cells.push(pivotCell);

        //don't render undefined & hidden column
        var children = props.children.filter(it => {
            return this.getHiddenColumnByKey(hiddenColumn, it.key) && it.key.indexOf('undefined') ==-1;
        });

        //render only columns that are not hidden
        for (var i = ri.level + 1; i < children.length; i++) {
          if (!this.getHiddenColumnByAccessor(columns,children[i].key.match(/-(.*)/)[1]))
            cells.push(children[i]);
          else 
            cells.push(<div className='rt-td' style={children[i].props.style} key={`empty-${i}`}></div>);
        }
        return <div className={`rt-tr ${rest.className}`} style={rest.style}>{cells}</div>;
      }
      //don't render hidden column
      rest.children = rest.children.filter(it => {
          return this.getHiddenColumnByKey(hiddenColumn, it.key) && it.key.indexOf('undefined') ==-1;
      });
      return <Component.defaultProps.TrComponent {...rest} />;
    }

    TrGroupComponent = (props) => {
      const { 
        ri,
        ...rest 
      } = props;
      if (ri && ri.level > 0) {
        if (ri.row._pivotVal !== "null"){
          var subRows = this.props.subRowFilter ? this.props.subRowFilter(ri.subRows, this.props) : ri.subRows;
          return  <SubTable pivotVal={ri.row._pivotVal} columns={this.props.subHeaders} data={subRows} level={ri.level} treeTableIndent={this.props.treeTableIndent}/>;
        } else {
          return null;
        }
      }
      return <Component.defaultProps.TrGroupComponent {...rest} />;
    }

    getTrGroupProps = (state,ri,ci,instance) => {
      return {ri};
    }

    getTrProps = (state,ri,ci,instance) => {
      return {ri};
    }

    render() {
      const { columns, treeTableIndent, ...rest } = this.props;
      const { TrComponent, TrGroupComponent, getTrProps,getTrGroupProps } = this;
      const extra = {
        columns: columns.map((col)=>{
          let column = col;
          return column;
        }),
        TrComponent,
        getTrProps,
        TrGroupComponent,
        getTrGroupProps
      };
      
      return (
        <Component {...rest} {...extra} ref={ r => this.wrappedInstance=r }/>
      )
    }
  }
  wrapper.displayName = 'RTTreeTable';
  wrapper.defaultProps = 
  {
    treeTableIndent: 10,
  }
  
  return wrapper;
}