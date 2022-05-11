import React, {Component} from 'react';
import 'sweetalert2/src/sweetalert2.scss';

import axios from "axios";
import swal from "sweetalert";
import * as Swal from "sweetalert2";
import Button from "react-bootstrap/Button";

import './ShopAdmin.css';
import {Badge, ButtonGroup, Card, Container, Image, InputGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFilter,
    faPen,
    faSearch,
    faTimes,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons/faPlusSquare";


class productList extends Component {


    constructor() {
        super();

        this.state = {
            Product: [],
            id: '',
            brand: '',
            productname: '',
            qty: '',
            price: '',
            searchclick: false,
            filterType: 'All',
            filterRate: 'All',
            search: ''
        }
        this.getAllProducts = this.getAllProducts.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateBtnclicked = this.updateBtnclicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addItem = this.addItem.bind(this);

    }

    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts() {
        axios.get('http://localhost:8080/productController/getAll').then(response => {

            this.setState({
                Product: response.data


            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleSearch(event) {
        event.preventDefault();

        this.setState({search: event.target.value});
    }

    handleSubmit() {
        if (this.state.search !== '') {
            axios.get(`http://localhost:8080/productController/searchbyname/` + this.state.search)
                .then(response => {
                    if (response.data.length > 0 ) {
                        this.setState({
                            Product: response.data
                        });
                    } else {
                        Swal.fire('No items found')
                    }

                }).catch(function (error) {
                    console.log(error);
            })
        } else {
            swal({
                title: "Enter an item to search",
                icon: "warning",
                buttons: "Ok"
            })
        }

    }

    addItem() {
        this.props.history.push('/AddItems')
    }

    deleteItem(id) {


        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'


        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/productController/deleteItem/' + id).then(response => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success',
                    );
                    this.getAllProducts();
                })
            } else {
                Swal.fire('Delete Canceled')
            }
        })

    }

    updateBtnclicked(id) {

        this.props.history.push(`/EditItem/${id}`)

    }

    // Data Filtering

    handleFilterDataChange = (e) => {
        e.preventDefault();

        this.setState({
            filterType: e.target.value,
            filterRate: e.target.value
        })

        console.log(e.target.value);

    }

    filterByType = () => {

        if (this.state.filterType !== '') {
            if (this.state.filterType === 'All') {
                this.getAllProducts();
            } else {
                axios.get('http://localhost:8080/productController/filter/' + this.state.filterType)
                    .then(res => {
                        if (res.data.length > 0) {
                            this.setState({
                                Product: res.data
                            })
                        } else {
                            Swal.fire('No items found')
                        }
                    })
            }
        }
    }

    clearFilterData = () => {
        this.setState({
            filterType: 'All',
            filterRate: 'All'
        });
        this.getAllProducts();
    }

    clearSearch = () => {
        if (this.state.search !== '') {
            this.setState({search: ''});
            this.getAllProducts();
        }

    }

    render() {

        const {Product} = this.state;

        return (

            <Container className={"my-5 py-4"} style={{width: '70rem'}}>
                <Card className={"adminCard"}>
                    <div className={"text-center adminCardTitle"}>Item List</div>
                    <Card.Body className={"m-3"}>

                        <div className={"p-5 mb-5"} style={{border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px'}}>
                            <div className={"row"}>
                                <div className={"row"}>
                                    <div className={"col text-center"} style={{backgroundColor: '#fff'}}>
                                        <Button variant={"dark"} type={"submit"} onClick={this.addItem}>
                                            <FontAwesomeIcon icon={faPlusSquare}/>&nbsp; Add Item
                                        </Button>

                                    </div>
                                </div>
                                <div className={"col"}>
                                    <InputGroup>
                                        <select className={"form-control"} value={this.state.filterType}
                                                onChange={this.handleFilterDataChange}>
                                            <option value={"All"}>Category</option>
                                            <option value={"Men"}>Men Collection</option>
                                            <option value={"Women"}>Women Collection</option>
                                            <option value={"Shoes"}>Shoe Collection</option>
                                        </select>
                                        <InputGroup.Append>
                                            <ButtonGroup>
                                                <Button variant="info" style={{width: '40px', borderRadius: '0'}}>
                                                    <FontAwesomeIcon icon={faFilter} onClick={this.filterByType}/>
                                                </Button>
                                                <Button variant="danger" style={{width: '40px'}}>
                                                    <FontAwesomeIcon icon={faTimes} onClick={this.clearFilterData}/>
                                                </Button>
                                            </ButtonGroup>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>

                                <div className={"col-5 px-0"}>
                                    <div className={"input-group"}>
                                        <input className={"form-control"} type={"text"} value={this.state.search}
                                               placeholder={"Search items"} onChange={this.handleSearch} onClick={this.clearSearch}/>
                                        <Button variant={"dark"} type={"submit"}
                                                style={{float: 'right', borderRadius: '0 5px 5px 0'}}>
                                            <FontAwesomeIcon icon={faSearch} onClick={this.handleSubmit}/>
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className={"mb-5 table-responsive tableFixHead"}>

                            <Table borderless hover>
                                <thead>
                                <tr className={"tableHeaders"}>
                                    <th> </th>
                                    <th>NAME</th>
                                    <th>ID</th>
                                    <th className={"text-center"}>TYPE</th>
                                    <th>PRICE</th>
                                    <th className={"text-center"}>QTY</th>
                                    <th className={"text-center"}>ACTION</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    Product.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="10">No records at the moment</td>
                                        </tr>

                                        : [
                                            Product.map(row => {
                                                return (
                                                    <tr className={"tableRow"} key={row.id}>
                                                        <td className={"text-center py-2 pl-0 pr-3"}
                                                            style={{width: '200px'}}>
                                                            <Image className={"productImg"} variant="top"
                                                                   src={`data:image/jpeg;base64,${row.picture}`}/>
                                                        </td>
                                                        <td style={{verticalAlign: 'middle'}}>{row.productname}</td>
                                                        <td style={{verticalAlign: 'middle'}}>{row.id}</td>
                                                        <td style={{verticalAlign: 'middle', textAlign: 'center'}}>
                                                            {
                                                                row.catogeory === 'Men' ?
                                                                    <Badge variant="primary">MEN</Badge> :
                                                                    row.catogeory === 'Women' ?
                                                                        <Badge variant="success">WOMEN</Badge> :
                                                                        row.catogeory === 'Shoes' ?
                                                                            <Badge variant="info">SHOES</Badge> : ''
                                                            }

                                                        </td>
                                                        <td style={{verticalAlign: 'middle'}}>LKR {row.price}.00</td>

                                                        <td style={{
                                                            verticalAlign: 'middle',
                                                            textAlign: 'center'
                                                        }}>{row.qty}</td>
                                                        <td style={{
                                                            verticalAlign: 'middle',
                                                            textAlign: 'center',
                                                            width: '50px'
                                                        }}>
                                                            <ButtonGroup>
                                                                <Button variant={"warning"} type={"submit"}
                                                                        onClick={this.updateBtnclicked.bind(this, row.id)}>
                                                                    <FontAwesomeIcon icon={faPen}/>
                                                                </Button>
                                                                <Button variant={"danger"} type={"submit"}
                                                                        onClick={this.deleteItem.bind(this, row.id)}>
                                                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                                                </Button>
                                                            </ButtonGroup>
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

        );
    }


}

export default productList;