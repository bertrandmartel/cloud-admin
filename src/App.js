import React, { Component } from 'react';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TopNavbar from './component/TopNavbar.js';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab }  from 'material-ui/Tabs';
import * as Storage from './stores/Storage';
import DataTable from "./component/DataTable";
import "react-table/react-table.css";
import InfoView from './component/InfoView.js';
import config from './config';
import axios from 'axios';

const defaultPageSize = 20;

const theme = createMuiTheme({
    palette: {
        type: 'light',
        secondary: {
          main: '#ffffff',
        },
    },
});

const styles = theme => ({
    root: {
    	flexGrow: 1,
  	}
});

function fetchData(url) {
    return new Promise(function(resolve, reject) {
        axios.get(url)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
    });
}

class App extends Component {
    
    state = {
        tabs: 0,
        mode: config.mode[0].name,
        headers: [],
        openInfo: false
    };

    table = {};

    rawData = {};

    datatable = [];

    constructor() {
        super();
        this.handleTabChange = this.handleTabChange.bind(this);
        this.onEditMode = this.onEditMode.bind(this);
        this.state.mode = Storage.getMode();
        this.onTableUpdate = this.onTableUpdate.bind(this);
        this.onShowInfo = this.onShowInfo.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    componentDidMount(){
        this.initializeHeaders(this.state.mode);
    }

    initializeHeaders(mode){
        var that = this;
        for (var it in config.mode) {
            if (config.mode[it].name === mode){
                //demo is a special case
                if (mode === 'demo') {
                    this.rawData = require('./demo/template').data;
                    return this.setState({
                        headers: require('./demo/template').headers,
                        mode: mode
                    });
                }
                else {
                    return fetchData(config.mode[it].url).then(function(values) {
                        if (values.data){
                            that.setState({
                                headers: values.data,
                                mode: mode
                            });
                        }
                    });
                }
            }
        }
    }

    handleTabChange(event, value){
        this.setState({ 
            tabs: value 
        });
    }

    onEditMode(mode){
        Storage.setMode(mode);
        for(var obj in this.datatable){
            if (this.datatable[obj]){
                this.datatable[obj].fetchData();
            }
        }
        this.initializeHeaders(mode);
    }

    onTableUpdate(name, tableState){
        this.table[name] = tableState;
        this.setState({});
    }

    onShowInfo(){
        this.setState({
            openInfo: true
        });
    }

    closeDialog(){
      this.setState({
        openInfo: false
      });
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <TopNavbar mode={this.state.mode}
                               onEditMode={this.onEditMode}
                               onShowInfo={this.onShowInfo}
                               showEditMode={config.showEditMode}
                               className={classNames(classes.appBar,classes.appBarShift)}/>
                </div>
                <main className={classes.content}>
                    <AppBar position="static">
                        <Tabs value={this.state.tabs} onChange={this.handleTabChange}>
                        {   
                            this.state.headers.map(item => {
                                return (
                                  <Tab key={`${this.props.name}:${item.name}`} label={item.displayName || item.name} />
                                );
                            })
                        }
                        </Tabs>
                    </AppBar>
                    {
                        this.state.headers.map((item, index) => {
                            return (
                              this.state.tabs === index && 
                                <DataTable 
                                    ref={n => { this.datatable[index] = n; }}
                                    key={`${this.props.name}:tab${item.name}`}
                                    fields={item.fields}
                                    subFields={item.subFields}
                                    pivotBy={item.pivotBy}
                                    name={item.name}
                                    url={item.url}
                                    dataLength={item.dataLength}
                                    mode={this.state.mode}
                                    rawData={this.rawData}
                                    onTableUpdate={this.onTableUpdate}
                                    data={this.table[item.name] ? this.table[item.name].data :[]}
                                    pages={this.table[item.name] ? this.table[item.name].pages : -1}
                                    loading={this.table[item.name] ? this.table[item.name].loading : false}
                                    pageSize={this.table[item.name] ? this.table[item.name].pageSize : defaultPageSize}
                                    pageIndex={this.table[item.name] ? this.table[item.name].pageIndex : 0}
                                />
                            );
                        })
                    }
                    <InfoView
                        onDialogClose={this.closeDialog}
                        open={this.state.openInfo}
                    />
                </main>
             </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);