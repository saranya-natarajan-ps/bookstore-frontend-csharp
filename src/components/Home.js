import React from "react";
import { Container, Button } from "react-bootstrap";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home">
      <Container fluid className="home-container">
        <div className="home-content">
          <h1 className="home-title">Welcome to the Bookstore!</h1>
          <p className="home-description">
            Explore our collection of books, authors, and genres.
          </p>
          <hr className="my-4" />
          <p>
            Manage your bookstore inventory with ease. Add, edit, and delete
            books, authors, and genres.
          </p>
          <Button variant="primary" href="/books">
            Browse Books
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
