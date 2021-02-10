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

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/join' component={JoinRoomPage} />
                    <Route path='/create' component={CreateRoomPage} />
                    <Route path='/room/:roomCode' component={RoomPage} />
                    <Route path='/'><h1>This is the Home Page</h1></Route>
                </Switch>
            </Router>
        );
    }
}