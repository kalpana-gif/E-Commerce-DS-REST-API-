import React, {Component} from "react";
import './Search.css';
import Form from 'react-bootstrap/Form'
import axios from "axios";
import AuthenticationService from "../../Authentication/AuthenticationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faSearch, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Col, Row} from "react-bootstrap";
import swal from "sweetalert";
import Item from "../Views/Item/Item";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Product: false,
            Item: '',
            id: '',
            visible: 10,
            search: '',
            customerId: AuthenticationService.loggedUserId(),//we need customer id to find the items
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }


    handleSearch(event) {
        event.preventDefault();

        this.setState({search: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.get(`http://localhost:8080/productController/searchbyname/` + this.state.search)


            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        Product: true,
                        Item: res.data,
                        id: res.data.id
                    });
                } else {
                    swal({
                        title: "No items found!",
                        icon: "error",
                        button: "Ok!",
                    });
                }

            }).catch(function (error) {
            console.log(error);
        })
    }

    clearSearch() {
        if (this.state.search !== '') {
            this.setState({
                search: '',
                Product: false
            })

        }
    }

    buyBytnclicked(id) {
        console.log(id)
        console.log(this.state.customerId)
        axios.post(`http://localhost:8080/CartController/CartItems/${id}/${this.state.customerId}`);

    }

    loadMore() {
        this.setState((e) => {
            return {visible: e.visible + 5}
        })
    }

    typeSelect = (type) => {
        if (type !== "All") {
            axios.get('http://localhost:8080/productController/filter/' + type)
                .then(res => {
                    if (res.data.length > 0) {
                        this.setState({
                            Product: true,
                            Item: res.data,
                            id: res.data.id
                        })


                    } else {
                        swal({
                            title: "No items to display!",
                            icon: "error",
                            button: "Ok!",
                        });
                    }
                })

        } else {
            this.setState({
                Product: false
            })
        }

    }

    render() {
        if (this.state.Product === false) {

            return (
                <div>
                    {/*--------------------------Navbar--------------------------*/}
                    <div>
                        <Row className={"align-items-center px-5 py-4"}>
                            <Col>
                                <Button variant={"none"} className={"sub-nav-item"}
                                        onClick={() => this.typeSelect("All")}>All</Button>
                                <Button variant={"none"} className={"sub-nav-item"}
                                        onClick={() => this.typeSelect("Women")}>Women Collection</Button>
                                <Button variant={"none"} className={"sub-nav-item"}
                                        onClick={() => this.typeSelect("Men")}>Men Collection</Button>
                                <Button variant={"none"} className={"sub-nav-item"}
                                        onClick={() => this.typeSelect("Shoes")}>Shoe Collection</Button>
                            </Col>
                            <Col md="auto">
                                <Form inline onSubmit={this.handleSubmit}>
                                    <div className={"search"}>
                                        <input type="text" placeholder="Search" className="searchInput"
                                               onChange={this.handleSearch} onClick={this.clearSearch}
                                               value={this.state.search} required={true}/>
                                        <button type="submit" className="searchButton"><FontAwesomeIcon
                                            icon={faSearch}/></button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </div>

                    {/*--------------------------All Items--------------------------*/}
                    <Item/>

                </div>


            );


        } else {

            console.log(this.state.Item.id);


            return (
                <div>
                    {/*--------------------------Navbar--------------------------*/}
                    <div>
                        <Row className={"align-items-center px-5 py-4"}>
                            <Col>
                                <Button variant={"none"} className={"sub-nav-item"}
                                        onClick={() => this.typeSelect("All")}>All</Button>
                                <Button variant={"none"} className={"sub-nav-item"}
                                        onClick={() => this.typeSelect("Women")}>Women Collection</Button>
                                <Button variant={"none"} className={"sub-nav-item"}
                                        onClick={() => this.typeSelect("Men")}>Men Collection</Button>
                                <Button variant={"none"} className={"sub-nav-item"}
                                        onClick={() => this.typeSelect("Shoes")}>Shoe Collection</Button>
                            </Col>
                            <Col md="auto">
                                <Form inline onSubmit={this.handleSubmit}>
                                    <div className={"search"}>
                                        <input type="text" placeholder="Search" className="searchInput"
                                               onChange={this.handleSearch} onClick={this.clearSearch}
                                               value={this.state.search} required={true}/>
                                        <button type="submit" className="searchButton"><FontAwesomeIcon
                                            icon={faSearch}/></button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </div>

                    {/*--------------------------Search or Filter Results--------------------------*/}
                    <div className={"my-5 px-2 py-4"}>

                        <Row className="justify-content-md-center mb-5">
                            {this.state.Item.slice(0, this.state.visible).map(product =>

                                <Card style={{width: '21rem', border: 'none'}} className={"card-div mx-3"}
                                      key={product.id}>
                                    <Card.Img variant={"top"} className={"card-product-img"}
                                              src={`data:image/jpeg;base64,${product.picture}`}/>
                                    <div className={"text-center btn-grp-div"}>
                                        <div className={"btn-inner-div"}>
                                            <Button variant={"none"} className={"card-item-button"}
                                                    onClick={this.buyBytnclicked.bind(this, product.id)}>
                                                <FontAwesomeIcon icon={faShoppingCart}/>
                                            </Button>
                                            <Button variant={"none"} className={"card-item-button"}>
                                                <FontAwesomeIcon icon={faHeart}/>
                                            </Button>
                                        </div>
                                    </div>
                                    <Card.Body className={"text-center"}>
                                        <Card.Title className={"product-title"}>{product.productname}</Card.Title>
                                        <Card.Subtitle
                                            className={"product-price my-2"}>LKR {product.price}.00</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            )}

                        </Row>

                    </div>

                </div>
            )


        }


    }


}

export default Search;