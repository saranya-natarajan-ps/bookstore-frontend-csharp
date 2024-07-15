import React from "react";
import { Modal, Button, Card } from "react-bootstrap";

const BookDetailsModal = ({ show, handleClose, book }) => {
  if (!book) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{book.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Img variant="top" src={book.image} alt={book.title} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
              <strong>Author:</strong>{" "}
              {book.Author ? book.Author.name : "Unknown Author"} <br />
              <strong>Genre:</strong>
              {book.Genre ? book.Genre.genre_name : "Unknown Genre"} <br />
              <strong>Price:</strong> {book.price} <br />
              <strong>Publication Date:</strong> {book.publication_date}
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookDetailsModal;
