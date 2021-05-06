import React, {Component} from 'react';
import './Header.css';
import {Navbar, Nav, NavDropdown, Badge} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faSignOutAlt, faBars, faShoppingCart, faPlusSquare, faClipboardList, faListAlt, faUser
} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router'
import AuthenticationService from '../Authentication/AuthenticationService';


class Header extends Component {
    state = {}

    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUserRole = AuthenticationService.loggedUserRole();
        const loggedUserName = AuthenticationService.loggedUserId();

        let loggedAsOperator = false;
        let loggedAsStudent = false;

        if (loggedUserRole != null && loggedUserRole === 'operator') {
            loggedAsOperator = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'student') {
            loggedAsStudent = true;
        }


        return (
            <div>
                <Navbar expand="lg" className={"navigation-bar"}>
                    <Link className="brand-name navbar-brand" to="/">Loire Valley</Link>
                    {loggedAsOperator &&
                    <div>
                        <Badge variant="dark" className={"admin-label"} >Admin</Badge>
                    </div>
                    }
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            {!loggedAsOperator &&
                                <Link className="navbar-icon" to="/"><FontAwesomeIcon icon={faShoppingCart}/></Link>
                            }

                            {loggedAsOperator &&
                            <NavDropdown title={<FontAwesomeIcon icon={faBars}/>}
                                         id="nav-dropdown">
                                <Link className="dropdown-item" to="/AddItems"><FontAwesomeIcon
                                    icon={faPlusSquare} className={"mr-2"}/> Add Products</Link>
                                <Link className="dropdown-item" to="/ViewAll"><FontAwesomeIcon icon={faListAlt} className={"mr-2"} /> View
                                    Products</Link>
                                <Link className="dropdown-item" to="/OrderList"><FontAwesomeIcon
                                    icon={faClipboardList} className={"mr-2"} /> Order List</Link>
                            </NavDropdown>  }

                            {loggedAsStudent &&
                            <NavDropdown title={<FontAwesomeIcon icon={faBars}/>}
                                         id="nav-dropdown">
                                <Link className="dropdown-item" to="/ShoppingCart"><FontAwesomeIcon
                                    icon={faShoppingCart} className={"mr-2"} />My Cart</Link>
                            </NavDropdown>}

                            {!isUserLoggedIn &&
                            <Link className="navbar-icon" to="/login"><FontAwesomeIcon icon={faUser}/></Link>}
                            {/*TODO:*/}
                            {isUserLoggedIn && <div className={"navbar-icon account-label"}><FontAwesomeIcon icon={faUser} className={"mr-2"}/>{loggedUserName}</div>}
                            {isUserLoggedIn && <Link className="navbar-icon" to="/login" onClick={AuthenticationService.logout}>
                                <FontAwesomeIcon icon={faSignOutAlt}/>
                            </Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


            </div>


        );
    }
}

export default withRouter(Header);