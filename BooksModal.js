// src/components/BooksModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../axiosConfig";

const BooksModal = ({ show, handleClose, book, onFormSubmit }) => {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [price, setPrice] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthorId(book.author_id);
      setGenreId(book.genre_id);
      setPrice(book.price);
      setPublicationDate(book.publication_date);
      setImage(book.image); // Set the image URL if editing a book
    } else {
      setTitle("");
      setAuthorId("");
      setGenreId("");
      setPrice("");
      setPublicationDate("");
      setImage(""); // Reset the image URL if adding a new book
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author_id: authorId,
      genre_id: genreId,
      price,
      publication_date: publicationDate,
      image, // Include the image URL in the book data
    };

    if (book) {
      // Update existing book
      try {
        await axios.put(
          `http://localhost:3001/books/${book.book_id}`,
          bookData
        );
        onFormSubmit();
      } catch (error) {
        console.error("Error updating book:", error);
      }
    } else {
      // Add new book
      try {
        await axios.post("http://localhost:3001/books", bookData);
        onFormSubmit();
      } catch (error) {
        console.error("Error adding book:", error);
      }
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-danger-subtle">
        <Modal.Title>{book ? "Edit Book" : "Add Book"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="fw-bold">Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold mt-2">Author ID</Form.Label>
            <Form.Control
              type="text"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              placeholder="Author ID"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold mt-2">Genre ID</Form.Label>
            <Form.Control
              type="text"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              placeholder="Genre ID"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold mt-2">Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold mt-2">Publication Date</Form.Label>
            <Form.Control
              type="date"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              placeholder="Publication Date"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold mt-2">Image URL</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            />
          </Form.Group>
          <Button variant="primary mt-2" type="submit">
            {book ? "Update Book" : "Add Book"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BooksModal;
