import React, {Component} from "react";
import axios from "axios";
import './ShopAdmin.css';
import swal from "sweetalert";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";


class UploadItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productname: '',
            id: '',
            brand: '',
            catogeory: '',
            description: '',
            price: '',
            qty: 0,
            image: '',
            imageURL: ' ',
            imageName: 'Choose file',
            imageURLValidation: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBrandName = this.handleChangeBrandName.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeCatogory = this.handleChangeCatogory.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeQty = this.handleChangeQty.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.onchangeFile = this.onchangeFile.bind(this);
        this.removePhoto = this.removePhoto.bind(this);

    }
    handleChangeBrandName() {
        this.setState({brand: 'none'});
    }

    handleChangeProductName(event) {
        this.setState({productname: event.target.value});
    }

    handleChangeID(event) {
        this.setState({id: event.target.value});
    }

    handleChangeCatogory(event) {
        this.setState({catogeory: event.target.value});
    }

    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    handleChangeQty(event) {
        this.setState({qty: event.target.value});
    }

    handleChangePrice(event) {
        this.setState({price: event.target.value});
    }


    async handleSubmit(event) {

        event.preventDefault();
        let formData = new FormData();
        formData.append('productname', this.state.productname);
        formData.append('id', this.state.id);
        formData.append('brand', this.state.brand);
        formData.append('catogeory', this.state.catogeory);
        formData.append('description', this.state.description);
        formData.append('file', this.state.image);
        formData.append('qty', this.state.qty);
        formData.append('price', this.state.price);

        console.log(formData)

        /* validation foe minus values*/

        if (this.state.price < 0 && this.state.qty > 0) {
            swal("check the price");

        } else if (this.state.price > 0 && this.state.qty < 0) {

            swal("check the qty!");
        } else {


            axios.post(`http://localhost:8080/productController/product`, formData)

                .then(res => {
                    console.log(formData)
                    console.log(res)
                    console.log(res.data);
                    this.props.history.push('/ViewAll/');

                    swal({
                        title: "Done !",
                        text: "Item Added Successfully!",
                        icon: "success",
                        timmer: 1,
                    });

                })
        }

        // console.log(this.state.image)
    }

    // photo upload part remove photo
    onchangeFile(e) {

        if (e.target.files.length) {
            this.setState({
                image: e.target.files[0],
                imageUrl: URL.createObjectURL(e.target.files[0]),
                imageName: e.target.files[0].name,
                imageURLValidation: true,
            });
        }


    }

    removePhoto() {
        this.setState({
            image: ' ',
            imageUrl: ' ',
            imageURLValidation: false,
            imageName: 'Choose file'
        })

    }

    render() {

        return (
            <Container className={"my-5 py-4"}>
                <Card className={"adminCard"}>
                    <div className={"text-center adminCardTitle"}>Add Item</div>
                    <Card.Body className={"m-3"}>
                        <form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col style={{maxWidth: '500px'}} >
                                    {
                                        this.state.imageURLValidation ?

                                            <Card.Img variant="top" src={this.state.imageUrl}/>
                                            : <Card.Img variant="top" src={require('../../../../Assets/noimg.jpg')}/>
                                    }
                                    <Row className={"mx-0 mt-4"}>
                                        <Col className={"p-0"}>
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    id="inputGroupFile01"
                                                    aria-describedby="inputGroupFileAddon01"
                                                    onChange={this.onchangeFile}
                                                    required={true}
                                                />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                    {this.state.imageName}
                                                </label>
                                            </div>
                                        </Col>
                                        {/*remove photo when its added*/}
                                        {
                                            this.state.imageURLValidation ?
                                                <Col className={"text-right p-0"} md={2}>
                                                    <Button variant={"danger"}
                                                            onClick={this.removePhoto}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </Button>
                                                </Col> : ''
                                        }
                                    </Row>

                                </Col>

                                {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

                                <Col>
                                    <div className={"mb-3"}>
                                        <label htmlFor="productId" className="grey-text">
                                            Item ID
                                        </label>
                                        <input type="text" id="productId" name="id" className="form-control"
                                               required={true}
                                               onChange={this.handleChangeID}/>
                                    </div>

                                    <div className={"mb-3"}>
                                        <label htmlFor="productname" className="grey-text ">
                                            Item name
                                        </label>
                                        <input type="text" id="productname" name="productname" className="form-control"
                                               required={true}
                                               onChange={this.handleChangeProductName}/>
                                    </div>

                                    <Row className={"mb-3"}>
                                        <Col>
                                            <label htmlFor="productQTY" className="grey-text">
                                                Quantity
                                            </label>
                                            <input type="number" id="productQTY" name="qty" className="form-control"
                                                   onChange={this.handleChangeQty}/>
                                        </Col>
                                        <Col>
                                            <label htmlFor="productPrice" className="grey-text">
                                                Price
                                            </label>
                                            <input type="" id="productPrice" name="price" className="form-control"
                                                   onChange={this.handleChangePrice}/>
                                        </Col>
                                    </Row>


                                    <div className={"mb-3"}>
                                        <label htmlFor="catogeory" className="grey-text">
                                            Category
                                        </label>
                                        <select className="browser-default custom-select" id="catogeory"
                                                name="catogeory" onChange={this.handleChangeCatogory}>
                                            <option>Choose your option</option>
                                            <option value="Men">Men Clothing</option>
                                            <option value="Women">Women Clothing</option>
                                            <option value="Shoes">Shoes</option>
                                        </select>
                                    </div>


                                    <div className={"mb-3"}>
                                        <label htmlFor="description" className="grey-text">
                                            Description
                                        </label>
                                        <textarea id="description" name="description"
                                                  className="form-control" rows="7"
                                                  onChange={this.handleChangeDescription}/>
                                    </div>


                                    <div className={"text-right"}>
                                        <Button variant={"primary"} type={"submit"}>Add Item</Button>
                                    </div>

                                </Col>
                            </Row>
                        </form>
                    </Card.Body>
                </Card>
            </Container>

        );
    }

}


export default UploadItems;