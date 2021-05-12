import React, { Component } from 'react';
import {Form, Button, Container, Card} from 'react-bootstrap';
import './Login.css'
import AuthenticationService from '../Authentication/AuthenticationService';
import AthenticationDataService from '../Authentication/AuthenticationDataService';
import { withRouter } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMsg: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]:event.target.value}
        )
    }

    loginClicked() {
        AthenticationDataService.getUser(this.state.userId)
            .then(
                response => {
                    if(response.data != null){
                        if(this.state.password === response.data.password){
                            AuthenticationService.successfulLogin(response.data.userId, response.data.name, response.data.role)
                            this.props.history.push("/")
                            this.setState({showSuccessMsg: true})
                            this.setState({hasLoginFailed: false})
                        }
                        else{
                            this.setState({showSuccessMsg: false})
                            this.setState({hasLoginFailed: true})
                        }
                    }
                    else{
                        this.setState({showSuccessMsg: false})
                        this.setState({hasLoginFailed: true})
                    }
                }
            )
    }

    
    render() {

        return (

            <Container>
                <Card style={{border:'none'}}>
                    <Card.Body>
                        <form>
                            <div className={"mb-3"}>
                                <label htmlFor="userId" className="grey-text">
                                    User ID
                                </label>
                                <input type="text" name="userId" className="form-control" placeholder={"ex: John Mayer"}
                                       value={this.state.userId} required={true} onChange={this.handleChange}/>
                            </div>

                            <div className={"mb-3"}>
                                <label htmlFor="password" className="grey-text">
                                    Password
                                </label>
                                <input type="password" name="password" className="form-control" placeholder="Password"
                                       value={this.state.password} required={true} onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                    &nbsp;We'll never share your passwords with anyone else.
                                </Form.Text>
                            </div>

                            <div className={"mb-3 mt-4"}>
                                <Button variant={"dark"} name={"signup"} block onClick={this.loginClicked}
                                        style={{fontSize:20, borderRadius:'0'}} className={"py-3"} >Login</Button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>

            </Container>

         );
    }
}
 
export default withRouter (Login);
