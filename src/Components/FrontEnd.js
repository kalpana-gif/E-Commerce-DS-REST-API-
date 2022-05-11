import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './Header-Footer/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import NotFound from './404NotFound/404NotFound';

import ShoppingCart from "./SHOP/Views/Cart/ShoppingCart";
import AddItem from './SHOP/Views/ShopAdmin/AddItem'
import ProductList from "./SHOP/Views/ShopAdmin/ProductList";
import EditItem from "./SHOP/Views/ShopAdmin/EditItem";

import OrderList from "./SHOP/Views/ShopAdmin/OrderList";
import Payment from "./SHOP/Views/Cart/Payment";
import Delivery from "./SHOP/Views/Cart/Delivery";
import Account from "./Login/Account";
import AuthenticatedRouteSeller from "./Authentication/AuthenticatedRouteSeller";
import AuthenticatedRouteBuyer from "./Authentication/AuthenticatedRouteBuyer";

class FrontEnd extends Component {

    state = {}

    render() {

        return (

            <div className="FrontEnd">

                <Router>

                    <Header/>

                    <Switch>


                        <Route path="/" exact component={Home}/>
                        {/*<Route path="/login" component={Login}/>*/}
                        {/*<Route path="/signup" component={SignUp}/>*/}
                        <Route path="/logout" component={Login}/>
                        <Route path="/myAccount" component={Account}/>

                        <AuthenticatedRouteBuyer Route path="/ShoppingCart/:id" component={ShoppingCart}/>
                        <AuthenticatedRouteBuyer Route path="/ShoppingCart/" component={ShoppingCart}/>
                        <AuthenticatedRouteBuyer Route path="/Payment/:total" component={Payment} />
                        <AuthenticatedRouteBuyer Route path="/Payment/:id" component={Login} />
                        <AuthenticatedRouteBuyer Route path="/Payment" component={Payment} />
                        <AuthenticatedRouteBuyer Route path="/Payment/login" component={Login} />
                        <AuthenticatedRouteBuyer Route path="/delivery/:id" component={Delivery} />
                        <AuthenticatedRouteBuyer Route path="/delivery" component={Delivery} />

                        <AuthenticatedRouteSeller Route path="/ViewAll/logout" component={Login}/>
                        <AuthenticatedRouteSeller Route path="/ViewAll/login" component={Login}/>
                        <AuthenticatedRouteSeller Route path="/AddItems" component={AddItem}/>
                        <AuthenticatedRouteSeller Route path="/ViewAll" component={ProductList}/>
                        <AuthenticatedRouteSeller Route path="/EditItem/:id"  component={EditItem}/>
                        <AuthenticatedRouteSeller Route path="/EditItem/"  component={EditItem}/>
                        <AuthenticatedRouteSeller Route path="/OrderList" component={OrderList} />


                        <Route component={NotFound}/>

                    </Switch>


                </Router>

            </div>

        );
    }
}

export default FrontEnd;
