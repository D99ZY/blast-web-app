import React, { Component } from 'react';
import {
    Button, Grid, Typography, TextField,
    FormHelperText, FormControl, Radio,
    RadioGroup, FormControlLabel, Collapse,
    Card, Box,
} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import RoomPage from "./RoomPage";

export default class CreateRoomPage extends Component {

    static defaultProps = {
        votesToSkip: 1,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => { }
    }

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            errorMsg: "",
            successMsg: "",
        };

        this.handleCreateRoomButtonPressed = this.handleCreateRoomButtonPressed.bind(this);
    }

    handleVotesChange = (e) => {
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    handleGuestCanPauseChange = (e) => {
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false,
        });
    }

    handleCreateRoomButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
            }),
        };

        fetch('/api/create-room', requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.history.push('/room/' + data.code));
    }

    handleUpdateRoomButtonPressed = () => {
        
        const requestOptions1 = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode,
            }),
        };

        const requestOptions2 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/update-room', requestOptions1)
            .then((response) => {
                if (response.ok) {
                    this.setState({
                        successMsg: "Room updated successfully!"
                    });
                }
                else {
                    this.setState({
                        errorMsg: "Error updating room..."
                    });
                }
                this.props.updateCallback();
            }).then(() => fetch('/spotify/check-skip', requestOptions2));
        
    }


    renderCreateButtons() {
        return (
            <Grid container spacing={1} align="center">

                <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={this.handleCreateRoomButtonPressed}>
                        Create A Room
                    </Button>
                </Grid>

                
                <Grid item xs={12}>
                    <Box mb={4}>
                        <Button color="secondary" variant="contained" to="/" component={Link}>
                            Back
                        </Button>
                    </Box>
                </Grid> 
                

            </Grid>
        );
    }

    renderUpdateButtons() {
        return (

            <Grid container spacing={1} align="center">
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleUpdateRoomButtonPressed}>
                        Update Room
                    </Button>
                </Grid>
            </Grid>
        );
    }

    renderTemplate() {
        
        const title = this.props.update ? "Update Room" : "Create a Room";

        return (

                <Grid container spacing={2} align="center">

                    <Grid item xs={12} align="center">
                        
                        <Collapse
                            in={this.state.errorMsg != "" || this.state.successMsg != ""}
                        >
        
                            {this.state.successMsg != "" ? (
                            <Alert
                                style={{width:'50%'}}
                                severity="success"
                                onClose={() => {
                                this.setState({ successMsg: "" });
                                }}
                            >
                                {this.state.successMsg}
                            </Alert>

                            ) : (
                                
                            <Alert
                                style={{width:'50%'}}
                                severity="error"
                                onClose={() => {
                                this.setState({ errorMsg: "" });
                                }}
                            >
                                {this.state.errorMsg}
                            </Alert>
                            )}
        
                        </Collapse>
        
                    </Grid>

                    <Grid item xs={12} align="center">
                        <Box mt={2}>
                            <Typography component="h4" variant="h4">
                                {title}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} align="center">

                        <FormControl component="fieldset">
                            <FormHelperText>
                                <div align="center">
                                    Guest Control of Playback State
                                </div>
                            </FormHelperText>

                            <RadioGroup style={{ display: 'flex' }} row defaultValue={this.props.guestCanPause.toString()} onChange={this.handleGuestCanPauseChange}>
                                <FormControlLabel
                                    value="true"
                                    control={<Radio color="primary" />}
                                    label="Play/Pause"
                                    labelPlacement="bottom"
                                    align="center"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio color="secondary" />}
                                    label="No Control"
                                    labelPlacement="bottom"
                                    align="center"
                                />
                            </RadioGroup>
                        </FormControl>

                    </Grid>

                    <Grid item xs={12} align="center">

                        <FormControl>
                            <TextField
                                required={true}
                                onChange={this.handleVotesChange}
                                type="number"
                                defaultValue={this.state.votesToSkip}
                                inputProps={{
                                    min: 1,
                                    style: { textAlign: "center" },
                                }}
                            />
                            <FormHelperText>
                                <div align="center">
                                    Votes Required To Skip Song
                                </div>
                            </FormHelperText>
                        </FormControl>

                    </Grid>

                    {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}

                </Grid>

        );

    }

    render() {

        if (this.props.update) {

            return (
                this.renderTemplate()
            );

        }
        else {

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
    
                    {this.renderTemplate()}
    
                </Card>
            );

        }  
    }
}