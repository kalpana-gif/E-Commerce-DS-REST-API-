import React, { Component } from 'react';
import { Card, Form, Button, Col,Row, Container, Table, ButtonGroup ,InputGroup, FormControl } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit, faTrash,faSearch,faTimes} from '@fortawesome/free-solid-svg-icons'
import InstructorService from '../../API/InstructorService';

class InstructorTableComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            instructors : [],
            search : "",
            fMessage: null,
            message : null,
        }
        this.addInstructor = this.addInstructor.bind(this)
        this.refreshInstructor = this.refreshInstructor.bind(this)
        this.deleteInstructorClicked = this.deleteInstructorClicked.bind(this)
        this.generateInstructorReportClicked = this.generateInstructorReportClicked.bind(this)
    }

    addInstructor(){
        this.props.history.push(`/addUser/instructor`);
    }

    componentDidMount(){
        this.refreshInstructor();
    }

    generateInstructorReportClicked(){
        InstructorService.downloadInstructorReport()
            .then(
                response => {
                    this.setState({message : response.data, fMessage:''});
                }
            )
    }

    refreshInstructor(){
        InstructorService.getInstructors().then((res) => {
            this.setState({instructors:res.data});
        });
    }

    UpdateInstructorClicked(id){
        this.props.history.push(`/addInstructor/${id}`)
    }

    

    deleteInstructorClicked(id){
        InstructorService.deleteInstructor(id)
        .then(() => this.refreshInstructor())
    }

    searchChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    
    
      cancelSearch =() =>{
        this.setState({
         search:'',
         searchMessage:null,
         fMessage:null
      })
       this.refreshInstructor();
    }
    
    searchData =() =>{
    
      if(this.state.search !==''){
        InstructorService.searchInstructor(this.state.search)
        .then(
          response =>{
            if(response.data.length >= 1){
              this.setState({instructors :response.data
                
              })
            }
            else{
              this.setState({searchMessage:"No matching Record Found", fMessage:null})
            }
          }
        )
      }
    }

    render() {
        const {search} = this.state;
        return (
            <div className="container " style ={{marginTop:30}}>
               
                
               
                 <Card className={"border border-dark "}>
                <Card.Header><div style={{"float":"left"}}>
                        <FontAwesomeIcon icon={faList} />Instructor List
                    </div>
                    <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                            <FormControl placeholder="Search" name ="search" value={search} 
                            classNamen = {"info-border bg-dark text-white "}
                            onChange={this.searchChange}/>

                            <InputGroup.Append>
                                <Button size="sm" variant = "outline-info" type = "button" onClick={this.searchData}>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </Button>
                                <Button size="sm" variant = "outline-danger" type = "button" onClick={this.cancelSearch}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </Button>
                            </InputGroup.Append>
                            
                        </InputGroup>
                    </div>
                    </Card.Header>
                <Card.Body>
                <div className = "button-margin">
                    <Button variant="primary" style ={{marginRight:20}} type="submit" onClick ={this.addInstructor}>
                    Add Instructor
                </Button>
                <Button variant="primary" type ="button" onClick ={this.generateInstructorReportClicked}>
                    Generate Report
                </Button>
                </div>
                    <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                        <th>InstructorID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        
                        <th>Contact Number</th>
                        <th>Qualifications</th>
                        <th>Experience</th>
                        <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                                this.state.instructors.map(
                                    instructor =>
                                    <tr key = {instructor.instructorId}>
                                        <td>{instructor.instructorId}</td>
                                        <td>{instructor.name}</td>
                                        <td>{instructor.address}</td>
                                        <td>{instructor.email}</td>
                                        
                                        <td>{instructor.phoneNo}</td>
                                        <td>{instructor.qualifications}</td>
                                        <td>{instructor.experience}</td>

                                        <td>
                                    <ButtonGroup>
                                
                                        <Button size="sm" variant="primary" style ={{marginRight:20}} onClick ={() => this.UpdateInstructorClicked(instructor.instructorId)}><FontAwesomeIcon icon={faEdit} /></Button>
                                        <Button size="sm" variant="outline-danger" onClick ={() => this.deleteInstructorClicked(instructor.instructorId)}><FontAwesomeIcon icon={faTrash} /></Button>

                                    </ButtonGroup>
                                    

                                      
                                    </td>
                                    </tr>

                                )
                            }
                            
                    </tbody>
                    </Table>
                </Card.Body>
            </Card>


                
            </div>
        );
    }
}

export default InstructorTableComponent;
