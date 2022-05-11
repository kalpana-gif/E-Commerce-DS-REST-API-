import React, {Component} from 'react';
import 'sweetalert2/src/sweetalert2.scss';

import './cart.css';
import '../ShopAdmin/ShopAdmin.css';

import axios from "axios";
import * as Swal from "sweetalert2";
import AuthenticationService from "../../../Authentication/AuthenticationService";
import {Card, Col, Container, Image, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";


class ShoppingCart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Product: [],
            total: 0,
            id1: AuthenticationService.loggedUserId()
        }


        this.deleteItem = this.deleteItem.bind(this);
        this.getCartItemsbyId = this.getCartItemsbyId.bind(this);


    }

    componentDidMount() {
        this.getCartItemsbyId();
    }

    getCartItemsbyId() {

        axios.get('http://localhost:8080/CartController/GetCartItems/' + this.state.id1).then(response => {
            this.setState({
                Product: response.data,
            });

            this.state.Product.forEach(product => {
                this.setState({
                    total: parseInt(product.price) + parseInt(this.state.total)
                })
            })
        }).catch(function (error) {
            console.log(error);

        })


    }

    checkout = (total) => {
        //send total to payment component
        // console.log("value:"+total)
        this.props.history.push(`/Payment/${total}`)
    }


    deleteItem(id) {

        console.log(id)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success',
                    axios.delete('http://localhost:8080/CartController/deleteItemAuto/' + id)
                        .then(response => {
                            console.log(response.data)
                            this.getCartItemsbyId();
                        }),

                )
                this.setState({
                    total:0
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })

    }


    render() {

        const {Product} = this.state;

        return (

            <Container className={"my-5 py-4"}>
                <Row>
                    <Col>
                        <Card className={"adminCard"}>
                            <div className={" text-center cartTitle"}>Shopping Cart</div>
                            <Card.Body className={"m-3"}>
                                <Table borderless>
                                    <thead>
                                    </thead>

                                    {
                                        this.state.Product.length === 0 ?
                                            <tr className={"cartRow"}>
                                                <div className={"mt-5 text-center"}>Your Cart is Empty</div>
                                            </tr>

                                    : [
                                        Product.map(Product =>
                                            <tbody key={Product.id}>
                                            <tr className={"cartRow"}>
                                                <td className={"text-center py-4 px-0"}>
                                                    <Image className={"productImg"} variant="top"
                                                           style={{width: '200px'}}
                                                           src={`data:image/jpeg;base64,${Product.picture}`}/>
                                                </td>

                                                <td style={{verticalAlign: 'middle'}} className={"py-2"}>
                                                    <div className={"itemName"}>{Product.productname}</div>
                                                    <div className={"itemID"}>{Product.id}</div>
                                                    <div className={"itemPrice"}>LKR {Product.price}.00</div>
                                                </td>

                                                <td style={{verticalAlign: 'middle'}}>
                                                    {/*<QTY/>*/}
                                                    <Button variant={"danger"} className={"itemBtn"}
                                                            onClick={this.deleteItem.bind(this, Product.id)}>
                                                        <FontAwesomeIcon icon={faTrash}/>&nbsp; Remove
                                                    </Button>
                                                </td>
                                            </tr>
                                            </tbody>

                                        )
                                        ]

                                    }


                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className={"px-4 pb-4 pt-1 mx-2"}>
                            <div className={"orderTitle"}>Order Summary</div>
                            <Row className={"orderText"}>
                                <Col>Total</Col>
                                <Col className={"text-right orderPrice"}>LKR {this.state.total}.00</Col>
                            </Row>

                            <div className={"text-center"}>
                                <Button className={"orderBtn"} variant={"primary"}
                                        onClick={() => this.checkout(this.state.total)}
                                        disabled={this.state.Product.length === 0} >
                                    CHECKOUT
                                </Button>
                            </div>


                        </Card>
                    </Col>
                </Row>
            </Container>


        );


    }
}


export default ShoppingCart;