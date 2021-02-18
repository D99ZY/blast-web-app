import React, { Component } from 'react';
import { Button, Grid, Typography, Card, Box } from "@material-ui/core";
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from "./MusicPlayer";

export default class RoomPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {},
        };
        this.roomCode = this.props.match.params.roomCode;
        this.handleLeaveRoomButtonPressed = this.handleLeaveRoomButtonPressed.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getRoomDetails();
    }

    componentDidMount() {
        this.interval = setInterval(this.getCurrentSong, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                if (this.state.isHost) {
                    this.authenticateSpotify();
                }
            });
    }

    authenticateSpotify = () => {

        fetch('/spotify/is-authenticated')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ spotifyAuthenticated: data.status });
                // If spotifyAuthenticated is false
                if (!data.status) {
                    fetch('/spotify/get-auth-url')
                        .then((response) => response.json())
                        .then((data) => {
                            // Redirect to Spotify authorize page
                            window.location.replace(data.url);
                        })
                }
            })

    }

    getCurrentSong() {
        fetch("/spotify/current-song")
            .then((response) => {
                if (!response.ok) {
                    return {};
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                this.setState({ song: data });
                console.log(data);
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

        var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        let cardStyle;

        if (screenWidth < 960) {
            cardStyle = {
                width: '80vw',
            }
        }
        else {
            cardStyle = {
                width: '30vw',
            }
        }

        return (
            
            <Card style={cardStyle} variant="outlined">

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
                        <Box my={2}>
                            <Button variant="contained" color="secondary" onClick={() => this.handleShowSettings(false)}>
                                Close
                            </Button>
                        </Box>
                    </Grid>

                </Grid>

            </Card>
            
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

        var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        let cardStyle;

        if (screenWidth < 960) {
            cardStyle = {
                width: '90vw',
            }
        }
        else {
            cardStyle = {
                width: '50vw',
            }
        }

        return (
            <Card style={cardStyle} variant="outlined">
                <Grid container spacing={1} align="center">

                    <Grid item xs={12}>
                        <Box mt={4}>
                            <Typography variant="h4" component="h4">Code: {this.roomCode}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box mb={2}>
                            <MusicPlayer {...this.state.song} />
                        </Box>
                    </Grid>

                    {this.state.isHost ? this.renderSettingsButton() : null}

                    <Grid item xs={12}>
                        <Box mb={2}>
                            <Button variant="contained" color="secondary" onClick={this.handleLeaveRoomButtonPressed}>
                                Leave Room
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </Card>

        );
    }

}