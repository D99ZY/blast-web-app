import React, { Component } from 'react';
import { Button, Grid, Typography } from "@material-ui/core";
import CreateRoomPage from './CreateRoomPage';

export default class RoomPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.handleLeaveRoomButtonPressed = this.handleLeaveRoomButtonPressed.bind(this);
    }

    getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((response) => {
                if (!response.ok) {
                    this.props.leaveRoomCallback();
                    this.props.history.push("/");
                }
                return response.json()
            })
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            });
    }

    handleLeaveRoomButtonPressed() {
        const requestOptions = {
            method: "POST",
            header: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((_response) => {
            this.props.leaveRoomCallback();
            this.props.history.push("/");
        });
    }

    handleShowSettings = (value) => {
        this.setState({
            showSettings: value,
        });
    }

    renderSettings = () => {
        return (
            <Grid container spacing={1} align="center">

                <Grid item xs={12}>
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip={this.state.votesToSkip} 
                        guestCanPause={this.state.guestCanPause} 
                        roomCode={this.roomCode}
                        updateCallback={this.getRoomDetails}>
                    </CreateRoomPage>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={() => this.handleShowSettings(false)}>
                        Close
                    </Button>
                </Grid>

            </Grid>
        );
    }

    renderSettingsButton = () => {
        return (
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => this.handleShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    render() {

        if (this.state.showSettings) {
            return this.renderSettings();
        }

        return (
            <Grid container spacing={1} align="center">

                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">Code: {this.roomCode}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">Total Votes To Skip: {this.state.votesToSkip}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">Guest Can Pause: {this.state.guestCanPause.toString()}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">Is Host: {this.state.isHost.toString()}</Typography>
                </Grid>

                {this.state.isHost ? this.renderSettingsButton() : null}

                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={this.handleLeaveRoomButtonPressed}>
                        Leave Room
                    </Button>
                </Grid>

            </Grid>

        );
    }

}