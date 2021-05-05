import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';

import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import NotFound from './404NotFound/404NotFound';

import ShopHome from './SHOP/Views/Home/ShopHome'
import ShoppingCart from "./SHOP/Views/Cart/ShoppingCart";
import AdminDashboard from './SHOP/Views/ShopAdmin/AdminDashboard'
import AddItem from './SHOP/Views/ShopAdmin/AddItem'
import ProductList from "./SHOP/Views/ShopAdmin/ProductList";
import EditItem from "./SHOP/Views/ShopAdmin/EditItem";

import OrderList from "./SHOP/Views/ShopAdmin/OrderList";
import Payment from "./SHOP/Views/Cart/Payment";

class FrontEnd extends Component {

    state = {}

    render() {

        return (

            <div className="FrontEnd">

                <Router>

                    <Header/>

                    <Switch>


                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Login}/>
                        <Route path="/ViewAll/logout" component={Login}/>

                        <Route path="/ViewAll/login" component={Login}/>

                        <Route path="/shop" component={ShopHome}/>
                        <Route path="/AdminDashboard" component={AdminDashboard}/>
                        <Route path="/AddItems" component={AddItem}/>
                        <Route path="/ShoppingCart/:id" component={ShoppingCart}/>
                        <Route path="/ShoppingCart/" component={ShoppingCart}/>
                        <Route path="/ViewAll" component={ProductList}/>
                        <Route path="/EditItem/:id"  component={EditItem}/>
                        <Route path="/EditItem/"  component={EditItem}/>

                        <Route path="/shop" component={ShopHome} />
                        <Route path="/OrderList" component={OrderList} />
                        <Route path="/Payment/:id/:tot/login" component={Login} />
                        <Route path="/Payment/:id/:tot/:value" component={Payment} />
                        <Route path="/Payment/:id" component={Login} />
                        <Route path="/Payment/:value" component={Payment} />
                        <Route path="/Payment" component={Payment} />
                        <Route path="/Payment/login" component={Login} />


                        <Route component={NotFound}/>

                    </Switch>

                    {/*<Footer />*/}

                </Router>

            </div>

        );
    }
}

export default FrontEnd;
