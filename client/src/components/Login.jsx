import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.scss'

export default function BasicExample() {
  // const [credentials, setCredentials] = useState({});
const submitLogin = function (event) {
  event.preventDefault();
  console.log('username(email)', event.target.elements[0].value);
  console.log('password', event.target.elements[1].value);
}
  // handleSubmit = async(event) => {
  //   event.preventDefault();

  //   await axios
  //   .post(
  //     "/api/login",
  //     {user, password}
  //   )
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // };


  return (
    <Container fluid>
      <Row> </Row>
      <Row className="mt-5 mb-5">
        <Col></Col>
        <Col >
        <Form
        onSubmit={(event) => submitLogin(event)}
        >
          <div className="loginText">
            PLease log in to continue...
          </div>
          <Form.Group className="mb-2">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
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