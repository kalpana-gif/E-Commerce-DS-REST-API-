import React, {Component} from "react";
import './Search.css';
import Form from 'react-bootstrap/Form'
import axios from "axios";
import {
    MDBAlert,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBContainer,
    MDBRow,
    MDBTooltip
} from "mdbreact";
import AuthenticationService from "../../Authentication/AuthenticationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faSearch, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Row} from "react-bootstrap";


class NavbarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Product: false,
            Item: '',
            id: '',
            visible: 10,
            customerId: AuthenticationService.loggedUserId(),//we need customer id to find the items
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }


    handleSearch(event) {
        this.setState({search: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.get(`http://localhost:8080/productController/searchbyname/` + this.state.search)


            .then(res => {
                console.log(this.state.Product)
                this.setState({
                    Product: true,
                    Item: res.data,
                    id: res.data.id
                });


            }).catch(function (error) {
            console.log(error);
        })

    }

    buyBytnclicked(id) {
        console.log(id)
        console.log(this.state.customerId)
        axios.post(`http://localhost:8080/CartController/CartItems/${id}/${this.state.customerId}`);

    }

    loadMore() {
        this.setState((e) => {
            return { visible: e.visible + 5 }
        })
    }

    render() {
        const {Product, id} = this.state


        let timerInterval
        // console.log("GGG"+this.state.Product)

        if (this.state.Product == false) {

            console.log("HHH")
            return (
                <div>
                    {/*<Nav><Nav.Link href="/ShoppingCart"><i className="fas fa-cart-plus"></i> CART</Nav.Link></Nav>*/}
                    <Form inline onSubmit={this.handleSubmit}>
                        <div className={"search"}>
                            <input type="text" placeholder="Search" className="searchInput" onChange={this.handleSearch}
                                   required={true}/>
                            <button type="submit" className="searchButton"><FontAwesomeIcon icon={faSearch}/></button>
                        </div>
                    </Form>

                </div>

            );


        } else {

            return (
                <div>
                    {/*<Nav><Nav.Link href="/ShoppingCart"><i className="fas fa-cart-plus"></i> CART</Nav.Link></Nav>*/}

                    <Form inline onSubmit={this.handleSubmit}>
                        <div className={"search"}>
                            <input type="text" placeholder="Search" className="searchInput" onChange={this.handleSearch}
                                   required={true}/>
                            <button type="submit" className="searchButton"><FontAwesomeIcon icon={faSearch}/></button>
                        </div>
                    </Form>

                    {/*<MDBAlert color="warning" dismiss>*/}
                    {/*    <strong>Searched Items </strong>Pick your items right now.*/}
                    {/*</MDBAlert>*/}

                    <div className={"my-5 px-2"}>
                        <Row className="justify-content-md-center">
                            {this.state.Item.slice(0,this.state.visible).map( item =>

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

                    </div>

                    {/*<MDBContainer>*/}
                    {/*    <MDBRow className={"py-5"}>*/}
                    {/*        {this.state.Item.map(item =>*/}

                    {/*            <div className={"col-4"}>*/}
                    {/*                /!*heading*!/*/}
                    {/*                /!*<h2 className='h1-responsive font-weight-bold text-center my-5'></h2>*!/*/}
                    {/*                <MDBCard narrow ecommerce className="mb-5 cardStyle" style={{*/}
                    {/*                    width: '18rem',*/}
                    {/*                    borderRadius: '2px',*/}
                    {/*                    boxShadow: '2px 1px 10px rgba(0,0,0,0.5'*/}
                    {/*                }}>*/}

                    {/*                    /!*image *!/*/}
                    {/*                    <MDBCardImage className={"p-2"}*/}
                    {/*                                  cascade*/}
                    {/*                                  top*/}
                    {/*                                  src={`data:image/jpeg;base64,${item.picture}`}*/}
                    {/*                                  alt='sample photo'*/}
                    {/*                    />*/}

                    {/*                    /!*body start here*!/*/}
                    {/*                    <MDBCardBody>*/}
                    {/*                        <a href='#!' className='text-muted'>*/}
                    {/*                            <h5>{item.brand}</h5>*/}
                    {/*                        </a>*/}

                    {/*                        /!*title start here*!/*/}
                    {/*                        <MDBCardTitle>*/}
                    {/*                            <strong>*/}
                    {/*                                <a href='#!'>{item.productname}</a>*/}
                    {/*                            </strong>*/}
                    {/*                        </MDBCardTitle>*/}
                    {/*                        <MDBCardText>{item.description}</MDBCardText>*/}

                    {/*                    </MDBCardBody>*/}
                    {/*                    <div className={"p-3 mx-2"}*/}
                    {/*                         style={{backgroundColor: '#dedede', borderRadius: '5px'}}>*/}
                    {/*                        <span className='float-left'>Rs:{item.price}</span>*/}
                    {/*                        <span className='float-right'>*/}

                    {/*                       /!*card footer items hart and eye *!/*/}
                    {/*                            <MDBTooltip domElement placement='top'>*/}
                    {/*                          <i className='grey-text fa fa-eye mr-3'/>*/}
                    {/*                          <span>Quick Look</span>*/}
                    {/*                        </MDBTooltip>*/}
                    {/*                        <MDBTooltip domElement placement='top'>*/}
                    {/*                          <i className='grey-text fa fa-heart'/>*/}
                    {/*                          <span>Add to Whishlist</span>*/}

                    {/*                        </MDBTooltip>*/}
                    {/*                    </span>*/}
                    {/*                    </div>*/}

                    {/*                    <button type="button" className="btn btn-outline-warning waves-effect m-2"*/}
                    {/*                            onClick={this.buyBytnclicked.bind(this, item.id)}><i*/}
                    {/*                        className='black-text fa fa-briefcase mr-3'/>BUY NOW*/}
                    {/*                    </button>*/}
                    {/*                </MDBCard>*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </MDBRow>*/}
                    {/*</MDBContainer>*/}

                </div>
            )


        }


    }


}

export default NavbarPage;