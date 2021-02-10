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

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/join' component={JoinRoomPage}></Route>
                    <Route path='/create' component={CreateRoomPage}></Route>
                    <Route path='/'><h1>This is the Home Page</h1></Route>
                </Switch>
            </Router>
        );
    }
}