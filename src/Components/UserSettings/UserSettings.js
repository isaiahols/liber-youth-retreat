import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog
} from '@material-ui/core';
import Axios from 'axios';

class UserSettings extends Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.handleDelete()
    };

    handleDelete = () => {
        axios.delete('/api/user/delete')

    }

    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Button onClick={this.handleClickOpen}>User Settings</Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"UserSettings"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Would you like to delete your account?
            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            No
            </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            <a href={process.env.REACT_APP_LOGOUT_REDIRECT}>Yes</a>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

UserSettings.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(UserSettings);