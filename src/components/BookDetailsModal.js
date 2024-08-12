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
              {book.author ? book.author.authorName : "Unknown Author"} <br />
              <strong>Genre:</strong>
              {book.genre ? book.genre.genreName : "Unknown Genre"} <br />
              <strong>Price:</strong> {book.price} <br />
              <strong>Publication Date:</strong> {book.publicationDate}
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
