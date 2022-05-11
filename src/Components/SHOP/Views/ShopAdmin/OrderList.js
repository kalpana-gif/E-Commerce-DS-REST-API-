import React, {Component} from 'react';
import 'sweetalert2/src/sweetalert2.scss';

import axios from "axios";
import swal from "sweetalert";

import './ShopAdmin.css';

import {Card, Container, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";



class OrderList extends Component {


    constructor(props) {
        super(props);

        this.state = {
            Order: [],
            order_id: '',
            product_id: '',
            productname: '',
            email: '',
            total_amount: '',
            descriptions: '',
            address: '',
            brand: '',
            purchase_date: '',
            resultArray: []

        }
        this.getAllProducts = this.getAllProducts.bind( this );
        this.deleteItem = this.deleteItem.bind( this );
        this.updateBtnclicked = this.updateBtnclicked.bind( this );
    }

    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts() {
        axios.get( 'http://localhost:8080/OrderController/getAll' ).then( response => {
            console.log(response.data)
            this.setState( {
                Order: response.data


            } );
        } ).catch( function (error) {
            console.log( error );
        } )
    }


    deleteItem(id) {
        swal( {
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        } )
            .then( (willDelete) => {
                if (willDelete) {
                    axios.delete( 'http://localhost:8080/OrderController/deleteItem/' + id ).then( response => {
                        console.log(response.data)
                        this.getAllProducts();
                    } )
                    swal( "Record has been deleted!", {
                        icon: "success",


                    } );
                }
            } );


    }

    updateBtnclicked(id) {
        this.props.history.push( `/EditItem/${id}` )

    }


    render() {

        const {Order} = this.state;

        return (
            <Container className={"my-5 py-4"} style={{width: '60rem'}}>
                <Card className={"adminCard"}>
                    <div className={"text-center adminCardTitle"}>Order List</div>
                    <Card.Body className={"m-3"}>

                        <div className={"mb-5 table-responsive tableFixHead"}>

                            <Table borderless hover>
                                <thead>
                                <tr className={"tableHeaders"}>
                                    <th>ORDER ID</th>
                                    <th>CUSTOMER ID</th>
                                    <th>TOTAL AMOUNT</th>
                                    <th>PURCHASE DATE</th>
                                    <th> </th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    Order.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="10"><h6 className={"mt-3"}>No records at the moment</h6></td>
                                        </tr>

                                        : [
                                            Order.map(order => {
                                                return (
                                                    <tr className={"tableRow"} key={order.order_id}>
                                                        <td style={{verticalAlign: 'middle'}}>{order.order_id}</td>
                                                        <td style={{verticalAlign: 'middle'}}>{order.customer_id}</td>
                                                        <td style={{verticalAlign: 'middle'}}>LKR {order.total_amount}.00</td>
                                                        <td style={{verticalAlign: 'middle'}}>{order.purchase_date}</td>
                                                        <td style={{
                                                            verticalAlign: 'middle',
                                                            textAlign: 'center',
                                                            width: '50px'
                                                        }}>
                                                                <Button variant={"danger"} type={"submit"}
                                                                        onClick={this.deleteItem.bind(this, order.order_id)}>
                                                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                                                </Button>

                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        ]
                                }


                                </tbody>
                            </Table>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        )
    }

}

export default OrderList;