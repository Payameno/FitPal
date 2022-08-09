import React from "react";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import "../App.scss";

export default function Footer () {
  return (
    <Container>
      <Row>
        <footer className="footer mt-auto">
          <div>	Copyright &copy; FitPal All rights reserved</div>
          <div>Resources</div>
          <div>About Us</div>
          <div>
            <Image alt="Youtube"></Image>
            <Image alt="Instagram"></Image>
            <Image alt="Twitter"></Image>
            <Image alt="Facebook"></Image>
          </div>
        </footer>
      </Row>
    </Container>
  );
}