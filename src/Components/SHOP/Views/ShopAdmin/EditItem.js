import React, {Component} from "react";
import './ShopAdmin.css';
import axios from "axios";
import swal from "sweetalert";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";


class EditItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productname: '',
            id: this.props.match.params.id,
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
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeCatogory = this.handleChangeCatogory.bind(this);
        this.handleChangeBrandName = this.handleChangeBrandName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeQty = this.handleChangeQty.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.onchangeFile = this.onchangeFile.bind(this);
        this.removePhoto = this.removePhoto.bind(this);

    }

    componentDidMount() {
        this.refreshProduct();
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

    handleChangeBrandName() {
        this.setState({brand: 'none'});
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
        formData.append('catogeory',this.state.catogeory);
        formData.append('description',this.state.description);
        formData.append('file',this.state.image);
        formData.append('qty',this.state.qty);
        formData.append('price',this.state.price);


        axios.put(`http://localhost:8080/productController/update`, formData)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.history.push('/ViewAll/');

                swal({
                    title: "Done !",
                    text: "Item Updated Successfully!",
                    icon: "success",
                    timmer: 1,
                });

            })
    }

    onchangeFile(e) {

        // if (URL.createObjectURL(e.target.files[0]) !== ' ') {
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


    refreshProduct() {

        if (this.state.id === -1) {
            return
        }

        axios.get('http://localhost:8080/productController/getDetails/' + this.state.id).then(response => {

            console.log(this.state.id)

            this.setState({
                id: this.state.id,
                productname: response.data.productname,
                brand: response.data.brand,
                picture:response.data.picture,
                catogeory: response.data.catogeory,
                price: response.data.price,
                qty: response.data.qty,
                description: response.data.description,


            });

        }).catch(function (error) {
            console.log(error);
        })

    }


    render() {
        return (
            <Container className={"my-5 py-4"}>
                <Card className={"adminCard"}>
                    <div className={"text-center adminCardTitle"}>Edit Product</div>
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
                                               defaultValue={this.state.id}
                                               onChange={this.handleChangeID}/>
                                    </div>

                                    <div className={"mb-3"}>
                                        <label htmlFor="productname" className="grey-text ">
                                            Item name
                                        </label>
                                        <input type="text" id="productname" name="productname" className="form-control"
                                               defaultValue={this.state.productname}
                                               onChange={this.handleChangeProductName}/>
                                    </div>

                                    <Row className={"mb-3"}>
                                        <Col>
                                            <label htmlFor="productQTY" className="grey-text">
                                                Quantity
                                            </label>
                                            <input type="number" id="productQTY" name="qty" className="form-control"
                                                   defaultValue={this.state.qty}
                                                   onChange={this.handleChangeQty}/>
                                        </Col>
                                        <Col>
                                            <label htmlFor="productPrice" className="grey-text">
                                                Price
                                            </label>
                                            <input type="" id="productPrice" name="price" className="form-control"
                                                   defaultValue={this.state.price}
                                                   onChange={this.handleChangePrice}/>
                                        </Col>
                                    </Row>


                                    <div className={"mb-3"}>
                                        <label htmlFor="catogeory" className="grey-text">
                                            Category
                                        </label>
                                        <select className="browser-default custom-select" id="catogeory"
                                                name="catogeory" onChange={this.handleChangeCatogory}
                                                value={this.state.catogeory}>
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
                                                  defaultValue={this.state.description}
                                                  onChange={this.handleChangeDescription}/>
                                    </div>


                                    <div className={"text-right"}>
                                        <Button variant={"warning"} type={"submit"}>Update</Button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </Card.Body>
                </Card>
            </Container>
        )}

}


export default EditItems;