//react
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Code from '@material-ui/icons/Code';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    flex: {
         flex: 1,
    },
    button: {
        marginRight: 10,
    },
    lastButton: {
        marginRight: 20
    },
    chip: {
        marginRight: 10,
        backgroundColor: 'white'
    },
    hide: {
        display: 'none',
    },
});

/**
 * The navigation bar 
 */
class TopNavbar extends Component {

    editMode = name => event => {
        if (typeof this.props.onEditMode === 'function') {
            this.props.onEditMode(event.target.value);
        }
    };

    showInfo(){
      if (typeof this.props.onShowInfo === 'function') {
          this.props.onShowInfo();
      }
    }

    /**
     * Share this page
     */
    share() {
        if (typeof this.props.onShare === 'function') {
            this.props.onShare();
        }
    }

    render() {
        const { classes } = this.props;

        return (<AppBar position="static" color="default" className={this.props.className}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {'Cloud Admin v' + process.env.REACT_APP_VERSION}
                        </Typography>
                        {
                        this.props.showEditMode && <FormControl className={classes.formControl}>
                            <Select
                                native
                                value={this.props.mode}
                                onChange={this.editMode('age')}
                                inputProps={{
                                  id: 'age-native-simple',
                                }}
                            >
                            <option value="demo">demo</option>
                            <option value="server">server</option>
                          </Select>
                        </FormControl>
                        }
	                    <Tooltip enterDelay={100}  disableTriggerFocus title="source code">
	                        <IconButton color="default" className={classes.button} aria-label="source code" href="https://github.com/bertrandmartel/cloud-admin">
	                            <Code/>
	                        </IconButton>
	                    </Tooltip>

                        <Tooltip enterDelay={100}  disableTriggerFocus title="information">
                          <IconButton onClick={() => this.showInfo()} color="default" className={classes.lastButton} aria-label="information">
                            <InfoIcon />
                          </IconButton>
                      </Tooltip>
                    </Toolbar>
                </AppBar>)
    }
}

TopNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
    showEditMode: PropTypes.bool.isRequired,
};

export default withStyles(styles)(TopNavbar);