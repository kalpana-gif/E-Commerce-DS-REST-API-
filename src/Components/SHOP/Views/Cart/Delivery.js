import React, {Component} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

import './cart.css';
import '../ShopAdmin/ShopAdmin.css';
import AuthenticationService from "../../../Authentication/AuthenticationService";


class Delivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId:'',
            amount: this.props.match.params.tot, //TODO:not returning tot
            address:'',
            contact:'',
            date: moment(new Date()).format('YYYY-MM-DD')
        }

    }

    componentDidMount() {
        const user = AuthenticationService.loggedUserId();
        console.log(this.state.amount)
        this.setState({
            customerId: user
        })
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let deliver = {
            customerID: this.state.customerId,
            address: this.state.address,
            userMobile: this.state.contact,
            orderAmount: "250",
            date: this.state.date
        }
        axios.post(`http://localhost:8080/DeliveryController/adddelivery`, deliver)
            .then(res => {
                console.log(res.data)

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Thank You for shopping with us!',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    this.props.history.push('/');
                })


            })
            .catch(err => {
                console.log(err.data)
            })

    }


    render() {
        return (
            <Container className={"my-5 py-4"} style={{width: '36.9rem'}}>
                <Card style={{width: '35rem'}} className={"payCard"}>
                    <Card.Header style={{backgroundColor: 'transparent'}}>
                        <div className={"payTitle"}>Delivery</div>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={this.handleSubmit}>
                        <div className={"mb-3"}>
                            <label htmlFor="address" className="grey-text">
                                Shipping Address
                            </label>
                            <input type="text" id="address" name="address" className="form-control"
                                   required={true} onChange={this.handleChange}/>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor="contact" className="grey-text">
                                Contact Number
                            </label>
                            <input type="text" id="contact" name="contact" className="form-control"
                                   pattern="[0-9]{10}" maxLength="10" required={true} onChange={this.handleChange}
                            />
                        </div>

                        <Row className={"mb-3"}>
                            <Col md={6}>
                                <label htmlFor="date" className="grey-text">
                                    Date
                                </label>
                                <input type="text" id="date" name="date" className="form-control" disabled
                                       value={this.state.date}/>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="amount" className="grey-text">
                                    Amount
                                </label>
                                <input type="text" id="amount" name="amount" className="form-control" disabled
                                       value={this.state.amount} />
                            </Col>
                        </Row>

                        <div className={"mb-3 mt-4"}>
                            <Button variant={"primary"} type={"submit"} block>Confirm</Button>
                        </div>
                        </form>
                    </Card.Body>
                </Card>


            </Container>

        );
    }


}


export default Delivery;