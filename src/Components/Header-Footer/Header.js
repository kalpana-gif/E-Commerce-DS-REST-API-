import React, {Component} from 'react';
import './Header.css';
import {Navbar, Nav, NavDropdown, Badge} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faSignOutAlt,
    faBars,
    faShoppingCart,
    faPlusSquare,
    faClipboardList,
    faListAlt,
    faUser,
    faHome
} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router'
import AuthenticationService from '../Authentication/AuthenticationService';
import swal from "sweetalert";


class Header extends Component {
    state = {}

    alert = () => {
        swal({
            title: "You need to Login!",
            icon: "warning",
            button: "Ok!",
        });
    }

    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUserRole = AuthenticationService.loggedUserRole();
        const loggedUserName = AuthenticationService.loggedUserId();
        const loggedUser = AuthenticationService.loggedUserName();

        let loggedAsSeller= false;
        let loggedAsBuyer = false;

        if (loggedUserRole != null && loggedUserRole === 'seller') {
            loggedAsSeller= true;
        }
        if (loggedUserRole != null && loggedUserRole === 'buyer') {
            loggedAsBuyer = true;
        }


        return (
            <div>
                <Navbar expand="lg" className={"navigation-bar"}>
                    <Link className="brand-name navbar-brand" to="/">Loire Valley</Link>

                    {loggedAsSeller&&
                    <div>
                        <Badge variant="dark" className={"admin-label"} >Admin</Badge>
                    </div>
                    }
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            {loggedAsSeller&&
                                <>
                                    <Link className="navbar-icon account-label" to="/" style={{textDecoration:'none'}}><FontAwesomeIcon icon={faHome} className={"mr-2"}/></Link>
                                    <NavDropdown title={<FontAwesomeIcon icon={faBars}/>}
                                                 id="nav-dropdown">
                                        <Link className="dropdown-item" to="/AddItems"><FontAwesomeIcon
                                            icon={faPlusSquare} className={"mr-2"}/> Add Products</Link>
                                        <Link className="dropdown-item" to="/ViewAll"><FontAwesomeIcon icon={faListAlt} className={"mr-2"} /> View
                                            Products</Link>
                                        <Link className="dropdown-item" to="/OrderList"><FontAwesomeIcon
                                            icon={faClipboardList} className={"mr-2"} /> Order List</Link>
                                    </NavDropdown>
                                </>
                            }

                            {loggedAsBuyer &&
                                <>
                                    <Link className="navbar-icon account-label" to="/" style={{textDecoration:'none'}}><FontAwesomeIcon icon={faHome}  className={"mr-2"}/>Home</Link>
                                    <Link className="navbar-icon account-label" style={{textDecoration:'none'}}  to="/ShoppingCart">
                                        <FontAwesomeIcon icon={faShoppingCart} className={"mr-2"} />My Cart</Link>
                                </>
                            }

                            {!isUserLoggedIn &&
                                <>
                                    <Link className="navbar-icon account-label" to="/" style={{textDecoration:'none'}} ><FontAwesomeIcon icon={faHome} className={"mr-2"}/></Link>
                                    <Link className="navbar-icon" to="/"><FontAwesomeIcon icon={faShoppingCart} onClick={() => this.alert()} /></Link>
                                    <Link className="navbar-icon" to="/myAccount"><FontAwesomeIcon icon={faUser}/></Link>
                                </> }

                            {isUserLoggedIn &&
                                <>
                                    <div className={"navbar-icon account-label"}><FontAwesomeIcon icon={faUser} className={"mr-2"}/>Hi, {loggedUser}</div>
                                    <Link className="navbar-icon account-label" to="/myAccount" onClick={AuthenticationService.logout} style={{textDecoration:'none'}}><FontAwesomeIcon icon={faSignOutAlt}/> Logout</Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


            </div>


        );
    }
}

export default withRouter(Header);