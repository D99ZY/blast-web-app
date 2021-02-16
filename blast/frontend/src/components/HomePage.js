import React, { Component } from 'react';
import {
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link, 
    Redirect,
} from 'react-router-dom';
import { Button, Grid, Typography, ButtonGroup, Card, Box } from "@material-ui/core";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import RoomPage from "./RoomPage";
import Info from './Info';


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
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
        
        var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        let cardStyle;

        if (screenWidth < 960) {
            cardStyle = {
                width: '80vw',
            }
        }
        else {
            cardStyle = {
                width: '40vw',
            }
        }
        
        return (
            
            <Card style={cardStyle} variant="outlined">
                <Grid container spacing={3} align="center">

                    <Grid item xs={12}>
                        <Box mt={4}>
                            <Typography variant="h1" component="h1">
                                blast
                            </Typography>
                        </Box>
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

                    <Grid item xs={12}>
                        <ButtonGroup disableElevation color="primary">

                            <Box mb={2}>
                                <Button color="default" to="/info" component={ Link }>
                                    Info
                                </Button>
                            </Box>

                        </ButtonGroup>
                    </Grid>

                </Grid>
            </Card>
        );
    }

    clearRoomCode() {
        this.setState({
            roomCode: null,
        });
    }

    render() {
        return (
            <Router>
                <Switch>

                    <Route path='/join' component={JoinRoomPage} />
                    <Route path='/create' component={CreateRoomPage} />
                    <Route path='/info' component={Info} />
                    <Route 
                        path='/room/:roomCode' 
                        render={(props) => {
                            return <RoomPage {...props} leaveRoomCallback={this.clearRoomCode} />;
                        }} 
                    />

                    <Route path='/' render={() => {
                        return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`} />) : this.renderHomePage();
                    }} />

                </Switch>
            </Router>
        );
    }
}