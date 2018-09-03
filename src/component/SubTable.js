import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from 'react-table';
import classnames from 'classnames';

const styles = theme => ({
	subTable: {
		marginLeft: '30px',
	}
});

class SubTable extends Component {

	constructor(){
		super();
		this.onExpand = this.onExpand.bind(this);
	}

	state = {
		isExpanded: false
	};

	onExpand(e){
		//only show the table if we have some data to show
		if (this.props.data.length > 0){
			this.setState({
				isExpanded: !this.state.isExpanded
			});
		}
	}

	render() {
		return (
		<div className="rt-tr-group">
            <div className="rt-tr" style={{paddingLeft: (this.props.treeTableIndent*this.props.level) + 'px'}}>
              <div className="rt-td rt-expandable rt-pivot">
                <div onClick={this.onExpand}>
                  <div className={classnames('rt-expander', this.state.isExpanded && '-open')} >•</div><span style={{color: (this.state.isExpanded ? "#8b0000" : "black")}}>{this.props.pivotVal} ({this.props.data.length})</span>
                </div>
              </div>
            </div>
            {
            this.state.isExpanded && <ReactTable
            	data={this.props.data}
            	columns={this.props.columns}
            	defaultPageSize={this.props.data.length}
            	style={{marginLeft: (this.props.treeTableIndent*this.props.level) + 'px'}}
            	showPagination={false}
            	showPageJump={false}/>
            }
        </div>);
	}
}

export default withStyles(styles)(SubTable);