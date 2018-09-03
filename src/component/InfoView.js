import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppsIcon from '@material-ui/icons/Apps';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import CopyrightIcon from '@material-ui/icons/Copyright';
import CodeIcon from '@material-ui/icons/Code';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
});

class InfoView extends Component {

    components = [
      {
        "name" : "create react app",
        "link" : "https://github.com/facebookincubator/create-react-app"
      },
      {
        "name" : "material-ui",
        "link" : "http://www.material-ui.com/#/"
      },
      {
        "name" : "react-table",
        "link" : "https://react-table.js.org/#/story/readme"
      },
      {
        "name" : "axios",
        "link" : "https://github.com/axios/axios"
      },
      {
        "name" : "Moment.js",
        "link" : "http://momentjs.com"
      },
      {
        "name" : "uuid",
        "link" : "https://github.com/kelektiv/node-uuid"
      }
    ];

    sourceCode = {
      "name" : "https://github.com/bertrandmartel/cloud-admin",
      "link" : "https://github.com/bertrandmartel/cloud-admin"
    };

    copyright = "The MIT License (MIT) Copyright (c) 2018 Bertrand Martel";

    version = 'Cloud Admin v' + process.env.REACT_APP_VERSION;

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        if (typeof this.props.onDialogClose === 'function') {
            this.props.onDialogClose();
        }
    };

    render() {
        return  <div>
                <Dialog open={this.props.open} onClose={this.close}>
                    <DialogTitle>{"About"}</DialogTitle>
                    <DialogContent>
                        <ListItem>
                          <ListItemIcon>
                            <InfoIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Info" secondary={this.version} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CopyrightIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Copyright" secondary={this.copyright} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CodeIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Source code" secondary={<a href={this.sourceCode.link} target="_blank">{this.sourceCode.name}</a>} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <AppsIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Open Source components" />
                        </ListItem>
                        <Collapse in={true} unmountOnExit>
                            {this.components.map(n => {
                                return (
                                    <ListItem key={n.name} >
                                      <ListItemText inset primary={<a href={n.link} target="_blank">{n.name}</a>} />
                                    </ListItem>
                                  );
                                })
                            }
                        </Collapse>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.close()}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
    }
}

InfoView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoView);