import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { addUser } from '../actions/addUser.js';
import '../App.scss'

// -- Controlled component - React form -- //
class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      age: '',
      weight_kg: '',
      height_cm: '',
      password: '',
      passwordConfirmation: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//receive form data on click
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
        [name]: value,
    })
  }

    handleSubmit = async(event) => {
      event.preventDefault();
      const { first_name, last_name, username, email, password, passwordConfirmation, age, weight_kg, height_cm, } = this.state;
      const user = {
        first_name,
        last_name,
        username,
        email,
        password,
        passwordConfirmation,
        age, 
        weight_kg,
        height_cm,
      }

      this.props.addUser(user, this.handleSuccess);
    };

    handleSuccess = () => {
      this.setState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        age: '',
        weight_kg: '',
        height_cm: '',
        password: '',
        passwordConfirmation: '',
      });

      this.props.history.push('/');
    };

    render() {

      const { first_name, last_name, username, email, password, passwordConfirmation, age, weight_kg, height_cm, } = this.state;

      return (
        <Container fluid className="mb-5">
        <Row> </Row>
        <Row className="mt-2">
          <Col></Col>
          <Col >
          <Form autoComplete="off"  onSubmit={this.handleSubmit} className="registerForm">
            <div className="loginText">
              Sign up today!
            </div>
            <Row> 
              <Col>
              <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
              type="text"
              name= "first_name"
              value={first_name}
              onChange={this.handleInputChange}
              placeholder="First Name"
              />
            </Form.Group>
              </Col>

              <Col>
              <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
              type="text"
              name= "last_name"
              value={last_name}
              onChange={this.handleInputChange}
              placeholder="Last Name"
              />
            </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
              <Form.Group className="mb-2">
              <Form.Label>User Name</Form.Label>
              <Form.Control 
              type="text"
              name= "username"
              value={username}
              onChange={this.handleInputChange}
              placeholder="User Name"
              />
            </Form.Group>
              </Col>

              <Col>
              <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              type="email"
              name= "email"
              value={email}
              onChange={this.handleInputChange}
              placeholder="Email Address"
              />
            </Form.Group>
              </Col>

            </Row>

            <Row>
              <Col>
              <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password"
              name= "password"
              value={password}
              onChange={this.handleInputChange}
              placeholder="Password"
              />
            </Form.Group>
              </Col>

              <Col>
              <Form.Group className="mb-2">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control 
              type="password"
              name= "password_confirmation"
              value={passwordConfirmation}
              onChange={this.handleInputChange}
              placeholder="Password Confirmation"
              />
            </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label>Age</Form.Label>
              <Form.Control 
              type="number"
              name= "age"
              value={age}
              onChange={this.handleInputChange}
              placeholder="Age"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Weight (Kg)</Form.Label>
              <Form.Control 
              type="number"
              name= "weight_kg"
              value={weight_kg}
              onChange={this.handleInputChange}
              placeholder="Weight in KG"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Height (Cm)</Form.Label>
              <Form.Control 
              type="number"
              name= "height_cm"
              value={height_cm}
              onChange={this.handleInputChange}
              placeholder="Height in CM"
              />
            </Form.Group>

            <Button className="mt-2" variant="info" type="submit">
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
};

const mapDispatchToProps = dispatch => {
  return {
      addUser: () => { dispatch(addUser()) }
  }
};

export default connect(null, mapDispatchToProps)(Signup);