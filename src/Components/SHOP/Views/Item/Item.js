import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBContainer,
    MDBRow,
    MDBTooltip,
} from 'mdbreact';
import './item.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import {withRouter} from "react-router";
import * as Swal from "sweetalert2";
import AuthenticationService from "../../../Authentication/AuthenticationService";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {faHeart, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class EcommercePage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: '',
            Product: [],
            customerId: AuthenticationService.loggedUserId(),
            repeat: '',
            visible: 10
        }

        this.buyBytnclicked = this.buyBytnclicked.bind(this);
        this.getAllProductsFromProduct = this.getAllProductsFromProduct.bind(this);
        this.loadMore = this.loadMore.bind(this);

    }

    componentDidMount() {
        this.getAllProductsFromProduct();
    }

    buyBytnclicked(id) {
        console.log(id)
        console.log(this.state.customerId)

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Check the Cart ,Successfully Added',
            showConfirmButton: false,
            timer: 1500
        })

        axios.post(`http://localhost:8080/CartController/CartItems/${id}/${this.state.customerId}`);

        axios.post('http://localhost:8080/CartController/saveCustomer/' + this.state.customerId);
        console.log("current user" + this.state.customerId)


    }

    getAllProductsFromProduct() {
        axios.get('http://localhost:8080/productController/getAll').then(response => {

            this.setState({
                Product: response.data,
                id: response.data.id,
            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    loadMore() {
        this.setState((e) => {
            return { visible: e.visible + 5 }
        })
    }


    render() {
        return (
            // Row include 5 items
            <div className={"my-5 px-2"}>
                <Row className="justify-content-md-center">
                    {this.state.Product.slice(0,this.state.visible).map( item =>

                        <Card style={{width: '21rem', border:'none'}} className={"card-div mx-3"}>
                            <Card.Img variant={"top"} className={"card-item-img"}
                                      src={`data:image/jpeg;base64,${item.picture}`} />
                            <div className={"text-center btn-grp-div"}>
                                <div className={"btn-inner-div"}>
                                    <Button variant={"none"} className={"card-item-button"}
                                            onClick={this.buyBytnclicked.bind(this,item.id)} >
                                        <FontAwesomeIcon icon={faShoppingCart}/>
                                    </Button>
                                    <Button variant={"none"} className={"card-item-button"}>
                                        <FontAwesomeIcon icon={faHeart}/>
                                    </Button>
                                </div>
                            </div>
                            <Card.Body className={"text-center"}>
                                <Card.Title className={"product-title"}>{item.productname}</Card.Title>
                                <Card.Subtitle className={"product-price my-2"}>LKR {item.price}.00</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    )}

                </Row>

                <div className={"text-center"}>
                    { this.state.visible < this.state.Product.length &&
                        <Button className={"load-btn"} variant={"none"} onClick={this.loadMore}>Load More</Button>
                    }
                </div>

                TODO: Search results needs to comes here


            </div>

        );
    }

}

export default withRouter(EcommercePage);