import React, { Component } from 'react';
import { Button, Grid, Typography } from "@material-ui/core";

export default class RoomPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.handleLeaveRoomButtonPressed = this.handleLeaveRoomButtonPressed.bind(this);
    }

    getRoomDetails() {
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

    render() {
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

                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick= { this.handleLeaveRoomButtonPressed }>
                        Leave Room
                    </Button>
                </Grid>

            </Grid>


            /*
            <div>
                <h3>{ this.roomCode }</h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest can pause: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
            </div>
            */
        );
    }

}