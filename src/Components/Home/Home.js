import React, {Component} from 'react';
import './Home.css';
import {Button, Carousel} from 'react-bootstrap';
import Search from "../SHOP/SearchBar/Search";

export default class Home extends Component {
    state = {}

    render() {
        return (
            <div>

            {/* --------------------------Carousel-------------------------- */}
                <Carousel fade
                    controls={false}>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src={require('../../Assets/ss1.jpg')}
                            alt="First slide"
                        />
                        <Carousel.Caption style={{top:'45%'}}>
                            <h3 className={"carousel-title"}>New Arrivals</h3>
                            <Button variant={"none"} className={"carousel-subtitle"}>Woman Collection</Button>
                            <Button variant={"none"} className={"carousel-subtitle"}>Man Collection</Button>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={require('../../Assets/ss2.jpg')}
                            alt="First slide"
                        />
                        <Carousel.Caption style={{top:'45%', right:'50%'}}>
                            <h3 className={"carousel-title"}>Shoe Collection</h3>
                            <Button variant={"none"} className={"carousel-subtitle"}>Shop Now</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>


                <Search />


            </div>
        );
    }
}