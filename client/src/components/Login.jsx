import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { loginUser } from '../actions/loginUser.js';
import '../App.scss'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
      this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser(this.state, this.handleSuccess);
  };

  handleSuccess = () => {
    this.setState({
      username: '',
      password: '',
    });
  };

render () {

  const { username, password } = this.state;

  return (
    <Container fluid>
      <Row> </Row>
      <Row className="mt-5 mb-5">
        <Col></Col>
        <Col >
        <Form
        onSubmit={this.handleSubmit}
        >
          <div className="loginText">
            PLease log in to continue...
          </div>
          <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control 
              type="text"
              name= "username"
              value={username}
              onChange={this.handleChange}
              placeholder="Username"
              />
            </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Password" 
            name= "password"
            onChange={this.handleChange}
            />
          </Form.Group>
          <Button 
          className="mt-2" 
          variant="info" 
          type="submit"
          >
            Submit
          </Button>
        </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row> </Row>
    </Container>
  );
  }

}

const mapStateToProps = (state) => ({
  error: state.user.error,
});
const mapDispatchToProps = dispatch => {
    return {
        loginUser: () => { dispatch(loginUser()) }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);