import React, { Component } from 'react';
import {
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link, 
    Redirect, 
} from 'react-router-dom';
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import RoomPage from "./RoomPage";
import { Button, Grid, Typography, ButtonGroup } from "@material-ui/core";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
    }

    async componentDidMount() {
        fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                roomCode: data.code
            });
        });
    }

    renderHomePage() {
        return (
            <Grid container spacing={3} align="center">

                <Grid item xs={12}>
                    <Typography variant="h1" component="h1">
                        blast
                    </Typography>
                </Grid>

                <Grid item xs={12}>

                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={ Link }>
                            Join a Room
                        </Button>
                        <Button color="secondary" to="/create" component={ Link }>
                            Create a Room
                        </Button>
                    </ButtonGroup>

                </Grid>

            </Grid>
        );
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/join' component={JoinRoomPage} />
                    <Route path='/create' component={CreateRoomPage} />
                    <Route path='/room/:roomCode' component={RoomPage} />

                    // If user has a room code stored in state, redirect to room, else go to home page
                    <Route path='/' render={() => {
                        return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`} />) : this.renderHomePage();
                    }} />
                </Switch>
            </Router>
        );
    }
}