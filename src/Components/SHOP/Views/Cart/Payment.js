import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Modal, Row, Tab, Tabs} from "react-bootstrap";

import './cart.css';
import '../ShopAdmin/ShopAdmin.css';
import swal from "sweetalert";
import AuthenticationService from "../../../Authentication/AuthenticationService";
import AuthenticationDataService from "../../../Authentication/AuthenticationDataService";
import moment from "moment";


class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tot: this.props.match.params.total,
            id: '',
            name: '',
            email: '',
            mobileNo: '',
            cardnum: '',
            cvv: '',
            expMonth: '',
            expYear: '',
            secretNo: '',
            cardBalance: '',
            pin: '',
            secretPin: '',
            amount: '',
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            today: moment(new Date()).format('YYYY-MM-DD'),
            feedback: '',
            toNumber: '',
            message: '',
            show: false

        }

    }

    componentDidMount() {
        const loggedUser = AuthenticationService.loggedUserId();

        AuthenticationDataService.getUser(loggedUser).then(res => {
            this.setState({
                id: loggedUser,
                name: res.data.name,
                email: res.data.email,
                mobileNo: res.data.mobileNo
            })
        })

    }

    handleDataChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    //pay by card
    handleCreditPay = (e) => {
        e.preventDefault();

        let cnum = this.state.cardnum;
        let cvc = this.state.cvv
        let eMonth = this.state.expMonth;
        let eYear = this.state.expYear;

        if (eMonth !== '' && eYear !== '' && cnum !== '' && cvc !== '') {

            if (cnum.length === 16) {
                if (cvc.length === 3) {
                    // check cvv
                    axios.get('http://localhost:8080/CreditCardController/getSecretNumber/' + cnum)
                        .then(res => {
                            if (res.data) {
                                // console.log(res.data)
                                this.setState({
                                    secretNo: res.data.secretNo,
                                    cardBalance: res.data.cardBalance
                                })

                                if (this.state.secretNo === cvc) {
                                    // console.log(true)

                                    // check expiration
                                    if (eMonth >= "01" && eMonth <= "12") {

                                        if (eMonth >= this.state.month && eYear >= this.state.year) {
                                            //not expired

                                            //check balance
                                            if (this.state.cardBalance > this.state.tot) {
                                                //payment successful;
                                                // console.log("success")
                                                this.sendFeedback();

                                                //to DB
                                                this.sendOrdertoDB();

                                            } else {
                                                swal({
                                                    title: "Insufficient Balance!",
                                                    icon: "warning",
                                                    buttons: "Ok"
                                                }).then(() => {
                                                    this.setState({
                                                        cvv: '',
                                                        cardnum: '',
                                                        expMonth: '',
                                                        expYear: ''
                                                    })
                                                })
                                            }

                                        } else {
                                            swal({
                                                title: "Expired Card!",
                                                icon: "warning",
                                                buttons: "Ok"
                                            }).then(() => {
                                                this.setState({
                                                    cvv: '',
                                                    cardnum: '',
                                                    expMonth: '',
                                                    expYear: ''
                                                })
                                            })
                                        }
                                    } else {
                                        swal({
                                            title: "Wrong Input!",
                                            icon: "warning",
                                            buttons: "Ok"
                                        }).then(() => {
                                            this.setState({
                                                cvv: '',
                                                cardnum: '',
                                                expMonth: '',
                                                expYear: ''
                                            })
                                        })
                                    }

                                } else {

                                    swal({
                                        title: "Error!",
                                        text: "Incorrect CVV",
                                        icon: "error",
                                        buttons: "Ok"
                                    }).then(() => {
                                        this.setState({
                                            cvv: '',
                                            cardnum: '',
                                            expMonth: '',
                                            expYear: ''
                                        })
                                    })
                                }

                            } else {
                                swal({
                                    title: "Error!",
                                    text: "Incorrect information",
                                    icon: "error",
                                    buttons: "Ok"
                                }).then(() => {
                                    this.setState({
                                        cvv: '',
                                        cardnum: '',
                                        expMonth: '',
                                        expYear: ''
                                    })
                                })
                            }
                        })

                } else {
                    swal({
                        title: "Invalid CVC number!",
                        icon: "warning",
                        buttons: "Ok"
                    })
                }
            } else {
                swal({
                    title: "Invalid card number!",
                    icon: "warning",
                    buttons: "Ok"
                })
            }

        } else {
            swal({
                title: "All details required!",
                icon: "warning",
                buttons: "Ok"
            })
        }


    }

    //pay by mobile bill
    handleMobilePay = (e) => {
        e.preventDefault();

        let num = this.state.mobileNo;
        let pinCode = this.state.pin;

        if (pinCode !== '') {
            if (pinCode.length === 4) {

                axios.get('http://localhost:8080/MobileBillController/getPinNumber/' + num)
                    .then(res => {
                        if (res.data) {
                            // console.log(res.data)
                            this.setState({
                                secretPin: res.data.secretNo,
                                amount: res.data.amount
                            })
                            console.log(this.state.secretPin)
                            console.log(this.state.amount)

                            //validate
                            if (this.state.secretPin === pinCode) {
                                if (this.state.amount > this.state.tot) {
                                    //payment successful
                                    this.sendFeedback();
                                    //to DB
                                    this.sendOrdertoDB();

                                } else {
                                    swal({
                                        title: "Insufficient Balance!",
                                        icon: "warning",
                                        buttons: "Ok"
                                    }).then(() => {
                                        this.setState({
                                            pin: '',
                                        })
                                    })
                                }
                            } else {

                                swal({
                                    title: "Error!",
                                    text: "Incorrect PIN",
                                    icon: "error",
                                    buttons: "Ok"
                                }).then(() => {
                                    this.setState({
                                        pin: ''
                                    })
                                })
                            }
                        }
                    })

            } else {
                swal({
                    title: "Invalid PIN number!",
                    icon: "warning",
                    buttons: "Ok"
                })

            }

        } else {
            swal({
                title: "PIN required!",
                icon: "warning",
                buttons: "Ok"
            })


        }
    }

    //order db
    sendOrdertoDB = () => {
        let formData = new FormData();
        formData.append('productname', '');
        formData.append('id', this.state.id);
        formData.append('total', this.state.tot);
        formData.append('Qty', '');
        formData.append('purchase_date', this.state.today);

        axios.post(`http://localhost:8080/OrderController/Order`, formData)
            .then(res => {
                console.log(res.data)

                //remove from cart
                this.deletefromCart();

            })
            .catch(err => {
                console.log(err.data)
            })
    }

    //remove from cart
    deletefromCart = () => {
        axios.delete('http://localhost:8080/CartController/deleteItem/' + this.state.id)
            .then(res => {

                //display modal box
                this.handleShow();

            })
    }


    //email and sms
    sendFeedback = () => {
        let name = this.state.name;
        let email = this.state.email;
        let feedback = "Payment Successfull. Thank You for shopping with us";
        let toNumber = "+94768605127";
        let message = "Payment Successfull. Thank You for shopping with us"

        axios.post('http://localhost:8080/Feedback/Email', {name, email, feedback})
            .then(res => {
                console.log(res.data)
            })

        axios.post('http://localhost:8080/Feedback/SMS', {toNumber, message})
            .then(res => {
                console.log(res.data)
            })
    }


    //Modal box
    handleShow = () => {
        this.setState({show: true})
    }
    //Modal box
    handleClose = () => {
        this.setState({show: false})
    }

    //delivery
    deliveryService = (response) => {
        if (response) {
            this.props.history.push(`/delivery/`+this.state.tot);
        } else {
            this.handleClose();
            this.props.history.push('/');
        }
    }

    render() {
        return (

            <Container className={"my-5 py-4"} style={{width: '36.9rem'}}>

                {/*-----------------------------------Credit Card-----------------------------------*/}
                <Tabs defaultActiveKey="credit" id="uncontrolled-tab-example">
                    <Tab eventKey="credit" title="Credit Card">

                        <Card style={{width: '35rem'}} className={"payCard"}>
                            <Card.Header style={{backgroundColor: 'transparent'}}>
                                <div className={"payTitle"}>Payment</div>
                            </Card.Header>
                            <Card.Body>
                                <div className={"mb-3"}>
                                    <label htmlFor="cardholder" className="grey-text">
                                        Card Holder Name
                                    </label>
                                    <input type="text" id="cardholder" name="cardholder" className="form-control"
                                           value={this.state.name} disabled/>
                                </div>

                                <div className={"mb-3"}>
                                    <label htmlFor="cardnum" className="grey-text">
                                        Card Number
                                    </label>
                                    <input type="text" id="cardnum" name="cardnum" className="form-control"
                                           required={true}
                                           pattern="[0-9]{16}" maxLength="16" value={this.state.cardnum}
                                           onChange={this.handleDataChange}/>
                                </div>

                                <Row className={"mb-3"}>
                                    <Col md={5}>
                                        <label htmlFor="exp" className="grey-text">
                                            Valid Thru
                                        </label>
                                        <Row>
                                            <Col className={"pr-0"}>
                                                <input type="text" id="expMonth" name="expMonth"
                                                       className="form-control" value={this.state.expMonth}
                                                       style={{width: '100%'}} placeholder={"MM"} maxLength="2"
                                                       required={true}
                                                       onChange={this.handleDataChange}/>
                                            </Col>
                                            <Col>
                                                <input type="text" id="expYear" name="expYear" className="form-control"
                                                       value={this.state.expYear}
                                                       style={{width: '100%'}} placeholder={"YYYY"} maxLength="4"
                                                       required={true}
                                                       onChange={this.handleDataChange}/>
                                            </Col>
                                        </Row>


                                    </Col>

                                    <Col md={7}>
                                        <label htmlFor="cvv" className="grey-text">
                                            CVC/CVV
                                        </label>
                                        <input type="password" id="cvv" name="cvv" className="form-control"
                                               required={true} maxLength="3" pattern="[0-9]{3}" value={this.state.cvv}
                                               onChange={this.handleDataChange}/>
                                    </Col>
                                </Row>

                                <div className={"mb-3"}>
                                    <label htmlFor="email" className="grey-text">
                                        Email Address
                                    </label>
                                    <input type="email" id="cmail" name="mail" className="form-control"
                                           value={this.state.email} disabled/>
                                </div>

                                <div className={"mb-3 mt-4"}>
                                    <Button variant={"primary"} type={"submit"} name={"cardpay"}
                                            onClick={this.handleCreditPay} block>Pay Now</Button>
                                </div>

                            </Card.Body>
                        </Card>
                    </Tab>


                    {/*-----------------------------------Mobile Payment-----------------------------------*/}
                    <Tab eventKey="mobile" title="Mobile">


                        <Card style={{width: '35rem'}} className={"payCard"}>
                            <Card.Header style={{backgroundColor: 'transparent'}}>
                                <div className={"payTitle"}>Payment</div>
                            </Card.Header>
                            <Card.Body>
                                <div className={"mb-3"}>
                                    <label htmlFor="pname" className="grey-text">
                                        Name
                                    </label>
                                    <input type="text" id="pname" name="pname" className="form-control"
                                           value={this.state.name} disabled/>
                                </div>

                                <Row className={"mb-3"}>
                                    <Col md={7}>
                                        <label htmlFor="pnumber" className="grey-text">
                                            Mobile Number
                                        </label>
                                        <input type="text" id="pnumber" name="pnumber" className="form-control"
                                               value={this.state.mobileNo} disabled/>
                                    </Col>

                                    <Col md={5}>
                                        <label htmlFor="pin" className="grey-text">
                                            PIN
                                        </label>
                                        <input type="password" id="pin" name="pin" className="form-control"
                                               required={true} maxLength="4" pattern="[0-9]{4}"
                                               onChange={this.handleDataChange}/>
                                    </Col>
                                </Row>

                                <div className={"mb-3"}>
                                    <label htmlFor="email" className="grey-text">
                                        Email Address
                                    </label>
                                    <input type="email" id="mmail" name="email" className="form-control"
                                           value={this.state.email} disabled/>
                                </div>

                                <div className={"mb-3 mt-4"}>
                                    <Button variant={"primary"} type={"submit"} name={"mobilepay"}
                                            onClick={this.handleMobilePay} block>Pay Now</Button>
                                </div>
                            </Card.Body>
                        </Card>

                    </Tab>
                </Tabs>


                {/*-----------------------------------------------------------------------------Modal Box-----------------------------------------------------------------------------*/}


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delivery</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you need additional delivery service ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.deliveryService(false)}>
                            No
                        </Button>
                        <Button variant="primary" onClick={() => this.deliveryService(true)}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>

        );
    }


}


export default Payment;