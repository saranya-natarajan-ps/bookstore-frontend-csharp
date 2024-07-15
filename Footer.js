// Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-body-secondary">
      <Container fluid>
        <Row>
          <Col md={6} className="text-left">
            <p>&copy; 2024 Prajna Bookstore. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-right">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/contact">Contact Us</a>
              </li>
              <li className="list-inline-item">
                <a href="/terms">Terms of Use</a>
              </li>
              <li className="list-inline-item">
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
