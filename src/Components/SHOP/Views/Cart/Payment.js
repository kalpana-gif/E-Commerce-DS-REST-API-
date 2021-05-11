import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Modal, Row, Tab, Tabs} from "react-bootstrap";

import './cart.css';
import '../ShopAdmin/ShopAdmin.css';
import swal from "sweetalert";
import AuthenticationService from "../../../Authentication/AuthenticationService";
import AuthenticationDataService from "../../../Authentication/AuthenticationDataService";


class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tot: this.props.match.params.total,
            name:'',
            email:'',
            mobileNo:'',
            cardnum: '',
            cvv:'',
            expMonth:'',
            expYear:'',
            secretNo:'',
            cardBalance:'',
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            show: false

        }

    }

    componentDidMount() {
        const loggedUser = AuthenticationService.loggedUserId();

        AuthenticationDataService.getUser(loggedUser).then(res => {
            this.setState({
                name:res.data.name,
                email:res.data.email,
                mobileNo:res.data.mobileNo
            })
        })

    }

    //CVV validation
    checkCVV = (cno,cvv) => {
        let valid = false;
        axios.get('http://localhost:8080/CreditCardController/getSecretNumber/' +cno)
            .then(res => {
                if (res.data) {
                    // console.log(res.data)
                    this.setState({
                        secretNo: res.data.secretNo,
                        cardBalance: res.data.cardBalance
                    })

                    if (this.state.secretNo === cvv) {
                        valid = true
                    } else {
                        valid = false
                        swal({
                            title: "Error!",
                            text: "Incorrect CVV",
                            icon: "error",
                            buttons: "Ok"
                        }).then(() =>{
                            this.setState({
                                cvv:'',
                                cardnum:'',
                                expMonth:'',
                                expYear:''
                            })
                        })
                    }

                } else {
                    swal({
                        title: "Error!",
                        text: "Incorrect information",
                        icon: "error",
                        buttons: "Ok"
                    }).then(() =>{
                        this.setState({
                            cvv:'',
                            cardnum:'',
                            expMonth:'',
                            expYear:''
                        })
                    })
                    valid = false;
                }
            })
        return valid;
    }

    //Inputs & Expire date Validation
    checkValidity = () => {
        let cnum = this.state.cardnum;
        let cvc = this.state.cvv
        let eMonth = this.state.expMonth;
        let eYear = this.state.expYear;
        let valid = false;

        if (eMonth !== '' && eYear !== '' && cnum !== '' && cvc !== '') {

            if (cnum.length === 16) {
                if (cvc.length === 3) {
                    // check cvv
                    if (this.checkCVV(cnum,cvc)) {

                        // check expiration
                        if (eYear >= this.state.year) {
                            if (eMonth>= this.state.month) {
                                //not expired
                                valid = true;
                            } else {
                                swal({
                                    title: "Expired Card!",
                                    icon: "warning",
                                    buttons: "Ok"
                                }).then(() =>{
                                    valid = false;
                                    this.setState({
                                        cvv:'',
                                        cardnum:'',
                                        expMonth:'',
                                        expYear:''
                                    })
                                })
                            }
                        } else {
                            swal({
                                title: "Expired Card!",
                                icon: "warning",
                                buttons: "Ok"
                            }).then(() =>{
                                valid = false;
                                this.setState({
                                    cvv:'',
                                    cardnum:'',
                                    expMonth:'',
                                    expYear:''
                                })
                            })
                        }

                    }
                } else {
                    swal({
                        title: "Invalid CVC number!",
                        icon: "warning",
                        buttons: "Ok"
                    })
                    valid = false;
                }
            } else {
                swal({
                    title: "Invalid card number!",
                    icon: "warning",
                    buttons: "Ok"
                })
                valid = false;
            }

        } else {
            swal({
                title: "All details required!",
                icon: "warning",
                buttons: "Ok"
            })
            valid = false;
        }

        return valid;
    }

    //check balance and pay
    handleCreditPay = (e) => {
        e.preventDefault();

        if (this.checkValidity) {
            if (this.state.cardBalance > this.state.tot ) {
                //payment successful; display modal box
                this.handleShow()
            } else {
                swal({
                    title: "Insufficient Balance!",
                    icon: "warning",
                    buttons: "Ok"
                }).then(() =>{
                    this.setState({
                        cvv:'',
                        cardnum:'',
                        expMonth:'',
                        expYear:''
                    })
                })
            }
        }


    }

    handleMobilePay = (e) => {
        e.preventDefault();
    }

    handleDataChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })

    }




    handleShow = () => {this.setState({show:true})}

    handleClose = () => {this.setState({show:false})}

    deliveryService = (response) => {
        if (response) {
            this.props.history.push('/delivery');
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        return (

            <Container className={"my-5 py-4"} style={{width:'36.9rem'}}>

                {/*-----------------------------------Credit Card-----------------------------------*/}
                <Tabs defaultActiveKey="credit" id="uncontrolled-tab-example">
                    <Tab eventKey="credit" title="Credit Card">

                        <Card style={{width:'35rem'}} className={"payCard"}>
                            <Card.Header style={{backgroundColor: 'transparent'}}><div className={"payTitle"}>Payment</div></Card.Header>
                            <Card.Body>
                                <div className={"mb-3"}>
                                    <label htmlFor="cardholder" className="grey-text">
                                        Card Holder Name
                                    </label>
                                    <input type="text" id="cardholder" name="cardholder" className="form-control" value={this.state.name} disabled/>
                                </div>

                                <div className={"mb-3"}>
                                    <label htmlFor="cardnum" className="grey-text">
                                        Card Number
                                    </label>
                                    <input type="text" id="cardnum" name="cardnum" className="form-control" required={true}
                                           pattern="[0-9]{16}" maxLength="16" value={this.state.cardnum}
                                           onChange={this.handleDataChange} />
                                </div>

                                <Row className={"mb-3"}>
                                    <Col md={5}>
                                        <label htmlFor="exp" className="grey-text">
                                            Valid Thru
                                        </label>
                                        <Row>
                                            <Col className={"pr-0"}>
                                                <input type="text" id="expMonth" name="expMonth" className="form-control"
                                                       style={{width:'100%'}} placeholder={"MM"} maxLength="2" required={true}
                                                       onChange={this.handleDataChange}/>
                                            </Col>
                                            <Col>
                                                <input type="text" id="expYear" name="expYear" className="form-control"
                                                       style={{width:'100%'}} placeholder={"YYYY"} maxLength="4" required={true}
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
                                    <input type="email" id="cmail" name="mail" className="form-control" value={this.state.email} disabled />
                                </div>

                                <div className={"mb-3 mt-4"}>
                                    <Button variant={"primary"} type={"submit"} onClick={this.handleCreditPay}  block>Pay Now</Button>
                                </div>

                            </Card.Body>
                        </Card>
                    </Tab>



                    {/*-----------------------------------Mobile Payment-----------------------------------*/}
                    <Tab eventKey="mobile" title="Mobile">

                        <form onSubmit={this.handleMobilePay}>
                        <Card style={{width:'35rem'}} className={"payCard"}>
                            <Card.Header style={{backgroundColor: 'transparent'}}>
                                <div className={"payTitle"}>Payment</div>
                            </Card.Header>
                            <Card.Body>
                                <div className={"mb-3"}>
                                    <label htmlFor="pname" className="grey-text">
                                        Name
                                    </label>
                                    <input type="text" id="pname" name="pname" className="form-control" value={this.state.name} disabled/>
                                </div>

                                <Row className={"mb-3"}>
                                    <Col md={7}>
                                        <label htmlFor="pnumber" className="grey-text">
                                            Mobile Number
                                        </label>
                                        <input type="text" id="pnumber" name="pnumber" className="form-control" value={this.state.mobileNo} disabled/>
                                    </Col>

                                    <Col md={5}>
                                        <label htmlFor="pin" className="grey-text">
                                            PIN
                                        </label>
                                        <input type="password" id="pin" name="pin" className="form-control"
                                               required={true} maxLength="4" pattern="[0-9]"
                                               onChange={this.handleChangeID}/>
                                    </Col>
                                </Row>

                                <div className={"mb-3"}>
                                    <label htmlFor="email" className="grey-text">
                                        Email Address
                                    </label>
                                    <input type="email" id="mmail" name="email" className="form-control" value={this.state.email} disabled />
                                </div>

                                <div className={"mb-3 mt-4"}>
                                    <Button variant={"primary"} onClick={this.handleShow} block>Pay Now</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        </form>
                    </Tab>
                </Tabs>


                {/*-------------------------Modal Box-------------------------*/}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delivery</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you need additional delivery service ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
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