import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService';
import {Route, Redirect} from 'react-router-dom';

export default class AuthenticatedRouteSeller extends Component {
    render() {

        if(AuthenticationService.isUserLoggedIn() && AuthenticationService.loggedUserRole === "seller") {
                return <Route {...this.props}/>
        } else {
            return <Redirect to="/myAccount"/>
        }
    }
}