import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../axiosConfig";

const BooksModal = ({ show, handleClose, book, onFormSubmit }) => {
  const [bookId, setId] = useState("");
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [price, setPrice] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [image, setImage] = useState("");
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    fetchAuthors();
    fetchGenres();
    if (book) {
      setId(book.bookId);
      setTitle(book.title);
      setAuthorId(book.author.authorId);
      setGenreId(book.genre.genreId);
      setPrice(book.price);
      const formattedDate = book.publicationDate
        ? new Date(book.publicationDate).toISOString().split('T')[0]
        : "";
      setPublicationDate(formattedDate);
      setImage(book.image);
    } else {
      // Clear form when no book is provided
      setTitle("");
      setAuthorId("");
      setGenreId("");
      setPrice("");
      setPublicationDate("");
      setImage("");
    }
    setConfirmationMessage(""); // Reset confirmation message when modal is opened
  }, [book, show]);

  useEffect(() => {
    if (resetForm) {
      setTitle("");
      setAuthorId("");
      setGenreId("");
      setPrice("");
      setPublicationDate("");
      setImage("");
      setResetForm(false);
    }
  }, [resetForm]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:5009/api/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:5009/api/genres");
      setGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookEditData = {
      bookId,
      title,
      authorId,
      genreId,
      price,
      publicationDate,
      image: image || "https://angelbookhouse.com/assets/front/img/product/edition_placeholder.png",
      author: { authorId },
      genre: { genreId },
    };

    const bookData = {
      title,
      authorId,
      genreId,
      price,
      publicationDate,
      image: image || "https://angelbookhouse.com/assets/front/img/product/edition_placeholder.png",
    };

    try {
      if (book) {
        await axios.put(
          `http://localhost:5009/api/books/${book.bookId}`,
          bookEditData
        );
      } else {
        await axios.post("http://localhost:5009/api/books", bookData);
      }
      setConfirmationMessage("Book saved successfully!");
      setResetForm(true);

      setTimeout(() => {
        setConfirmationMessage("");
        handleClose();
        onFormSubmit();
      }, 2000); // 2-second delay before closing modal
    } catch (error) {
      console.error("Error saving book:", error);
    }
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
            <Form.Label className="fw-bold mt-2">Author</Form.Label>
            <Form.Control
              as="select"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              required
              style={{ appearance: "auto" }} // Ensure default dropdown arrow
            >
              <option value="">Select Author</option>
              {authors.map((author) => (
                <option key={author.authorId} value={author.authorId}>
                  {author.authorName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold mt-2">Genre</Form.Label>
            <Form.Control
              as="select"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              required
              style={{ appearance: "auto" }} // Ensure default dropdown arrow
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre.genreId} value={genre.genreId}>
                  {genre.genreName}
                </option>
              ))}
            </Form.Control>
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
          {confirmationMessage && (
            <p className="text-success mt-2">{confirmationMessage}</p>
          )}
          <Button variant="primary mt-2" type="submit">
            {book ? "Update Book" : "Add Book"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BooksModal;
