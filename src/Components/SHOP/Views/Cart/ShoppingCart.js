import React, {Component} from 'react';
import 'sweetalert2/src/sweetalert2.scss';

import './cart.css';
import '../ShopAdmin/ShopAdmin.css';

import axios from "axios";
import swal from "sweetalert";
import * as Swal from "sweetalert2";
import AuthenticationService from "../../../Authentication/AuthenticationService";
import {Card, Col, Container, Image, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";


class ShoppingCart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // add data to the row using constructor\
            Id: [],
            id: '',
            brand: '',
            productname: '',
            qty: '',
            price: '',
            Product: [],
            data: [],
            value: 1,
            total: '',
            id1: AuthenticationService.loggedUserId(),

            //coulomns declare here
            columns: [
                {
                    label: 'ProductID',
                    field: 'id',
                },

                {
                    label: '',
                    field: 'img',
                },
                {
                    label: <strong>Product</strong>,
                    field: 'product'
                },
                {
                    label: <strong>Brand</strong>,
                    field: 'brand'
                },
                {
                    label: <strong>Price</strong>,
                    field: 'price'
                },
                {
                    label: <strong>QTY</strong>,
                    field: 'qty'
                },
                {
                    label: '',
                    field: 'button'
                },

            ]
        }


        this.deleteItem = this.deleteItem.bind(this);
        this.getCartItemsbyId = this.getCartItemsbyId.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.PaynowBtnClicked = this.PaynowBtnClicked.bind(this);

        console.log(this.value)

    }

    componentDidMount() {
        this.getCartItemsbyId();
    }

    getCartItemsbyId() {


        axios.get('http://localhost:8080/CartController/GetCartItems/' + this.state.id1).then(response => {

            this.setState({
                Product: response.data,
            });

        }).catch(function (error) {
            console.log(error);

        })


    }

    deleteItem(id) {

        console.log(id)
        // swal({
        //     title: "Are you sure?",
        //     text: "Once deleted, you will not be able to recover this imaginary file!",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // })
        //     .then((willDelete) => {
        //         if (willDelete) {
        //             axios.delete('http://localhost:8080/CartController/deleteItem/' + id).then(response => {
        //                 this.getCartItemsbyId();
        //
        //             })
        //             swal("Poof! Your imaginary file has been deleted!", {
        //                 icon: "success",
        //
        //
        //             });
        //         } else {
        //             swal("Your imaginary file is safe!");
        //         }
        //     });
//
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
                    axios.delete('http://localhost:8080/CartController/deleteItem/' + id).then(response => {
                        this.getCartItemsbyId();

                    })
                )
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

    getTotal() {
        this.setState
        ({total: this.state.price * this.state.value});


    }

    PaynowBtnClicked(id, qty, price, value) {
        console.log(id)
        console.log(qty)
        console.log(price)
        console.log(value)

        const tot = price * value;

        console.log(tot)

        this.props.history.push(`/Payment/${id}/${tot}/${value}`)
        // this.props.history.push(`/Payment/${value}`)


    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    //QTY changer
    decrease = () => {
        // console.log(this.state.value)
        this.setState({value: this.state.value - 1});

        if (this.state.value <= 0) {
            swal('qty cant be negative')
            // this.state.value=1;
            this.setState({value: 1});
        }

    }
    increase = () => {
        // console.log(this.state.value)
        this.setState({value: this.state.value + 1});

    }

    render() {

        const rows = [];
        const total = [];
        const {columns, Product} = this.state;

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
                                            Product.map( Product =>
                                                <tbody key={Product.id}>
                                                    <tr className={"cartRow"}>
                                                        <td className={"text-center py-4 px-0"}>
                                                            <Image className={"productImg"} variant="top" style={{width: '200px'}}
                                                                   src={`data:image/jpeg;base64,${Product.picture}`}/>
                                                        </td>

                                                        <td style={{verticalAlign: 'middle'}} className={"py-2"}>
                                                            <div className={"itemName"}>{Product.productname}</div>
                                                            <div className={"itemID"}>{Product.id}</div>
                                                            <div className={"itemPrice"}>LKR {Product.price}.00</div>
                                                        </td>

                                                        <td style={{verticalAlign: 'middle'}}>
                                                            {/*<QTY/>*/}
                                                            <Button variant={"danger"} className={"itemBtn"} onClick={this.deleteItem.bind(this, Product.qty)}>
                                                                <FontAwesomeIcon icon={faTrash}/>&nbsp; Remove
                                                            </Button>
                                                            <button onClick={this.increase}><FontAwesomeIcon icon={faPlus}/></button>
                                                            <input className="quantity" name="quantity" value={this.state.value}
                                                                   type="number"/>
                                                            <button onClick={this.decrease} ><FontAwesomeIcon icon={faMinus}/></button>
                                                            {/*TODO:issue on qty*/}
                                                            {/*<input type="number" name="quantity" className="form-control text-center itemQty"*/}
                                                            {/*       value={this.state.value} required={true} placeholder="enter qty" onChange={this.handleChange}/>*/}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )
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
                                    <Col className={"text-right orderPrice"}>LKR {this.state.value * Product.price}.00</Col>
                                </Row>

                                <div className={"text-center"} >
                                    <Button className={"orderBtn"} variant={"primary"}
                                            onClick={this.PaynowBtnClicked.bind(this, Product.id, Product.qty, Product.price, this.state.value)}>
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