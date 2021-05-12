import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService';
import {Route, Redirect} from 'react-router-dom';

export default class AuthenticatedRouteBuyer extends Component {
    render() {

        if(AuthenticationService.isUserLoggedIn() && AuthenticationService.loggedUserRole === "buyer") {
            return <Route {...this.props}/>
        } else {
            return <Redirect to="/myAccount"/>
        }
    }
}