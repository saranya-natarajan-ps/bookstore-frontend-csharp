// Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-body-secondary">
      <Container fluid>
        <Row>
          <Col md={6} className="text-centre">
            <p>&copy; 2024 Prajna Bookstore. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
