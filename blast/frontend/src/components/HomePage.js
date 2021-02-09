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
                    <Route exact path='/'><h1>This is the Home Page</h1></Route>
                    <Route exact path='/join' component={JoinRoomPage}></Route>
                    <Route exact path='/create' component={CreateRoomPage}></Route>
                </Switch>
            </Router>
        );
    }
}