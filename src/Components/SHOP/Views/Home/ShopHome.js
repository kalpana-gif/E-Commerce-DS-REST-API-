import React, {Component} from "react";
import '../../../Header-Footer/Header'
import '../../../Header-Footer/Header.css'

import NavbarPage from "../../SearchBar/Search";

import CarouselPage from "./Carousel";
import Item from "../Item/Item";
import  background from "../../../../Assets/history.jpg"

// import BrowserRouter from "../../Navigationbar/Nav";

class ShopHome extends Component{
    render() {
        return (
            <div className="ShopHome" style={{backgroundColor:"#a6a6a699",backgroundImage:background}}>

                <CarouselPage></CarouselPage>
                <NavbarPage></NavbarPage>
                <Item></Item>


            </div>
        );
    }

}
export  default ShopHome;