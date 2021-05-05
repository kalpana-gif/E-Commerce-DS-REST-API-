import React, {Component} from 'react';
import './Header.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faSignOutAlt, faBars, faShoppingCart, faPlusSquare, faClipboardList, faListAlt, faUser, faHome
} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router'
import AuthenticationService from '../Authentication/AuthenticationService';
import Search from "../SHOP/SearchBar/Search";


class Header extends Component {
    state = {}

    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUserRole = AuthenticationService.loggedUserRole();

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
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Search/>
                            <Link className="navbar-icon" to="/"><FontAwesomeIcon icon={faHome}/></Link>

                            {loggedAsOperator &&
                            <NavDropdown title={<FontAwesomeIcon icon={faBars}/>} style={{padding:'2px', marginRight:'50px'}}
                                         id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/AddItems"><FontAwesomeIcon
                                    icon={faPlusSquare} className={"mr-2"}/> Add Products</Link>
                                <Link className="dropdown-item" to="/ViewAll"><FontAwesomeIcon icon={faListAlt} className={"mr-2"} /> View
                                    Products</Link>
                                <Link className="dropdown-item" to="/OrderList"><FontAwesomeIcon
                                    icon={faClipboardList} className={"mr-2"} /> Order List</Link>
                            </NavDropdown>}

                            {loggedAsStudent &&
                            <NavDropdown title={<FontAwesomeIcon icon={faBars}/>} style={{padding:'2px', marginRight:'50px'}}
                                         id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/ShoppingCart"><FontAwesomeIcon
                                    icon={faShoppingCart} className={"mr-2"} />My Cart</Link>
                            </NavDropdown>}

                            {!isUserLoggedIn &&
                            <Link className="navbar-icon" to="/login"><FontAwesomeIcon icon={faUser}/></Link>}
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