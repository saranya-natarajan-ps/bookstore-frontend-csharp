import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "../axiosConfig";

const AuthorsModal = ({ show, handleClose, author, onFormSubmit }) => {
  const [authorName, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [authorId, setId] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (author) {
      setName(author.authorName || "");
      setBiography(author.biography || "");
      setId(author.authorId || 0);
    } else {
      // Clear form if no author is provided (for adding new)
      setName("");
      setBiography("");
      setId(0);
    }
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authorName.trim()) {
      setError("Author name is required.");
      return;
    }

    setError(null);

    const authorData = {
      authorName,
      biography,
    };

    const authorEditData = {
      authorId,
      authorName,
      biography,
    };
    try {
      if (author) {
        // Update existing author
        await axios.put(`http://localhost:5009/api/authors/${authorId}`, authorEditData);
      } else {
        // Add new author
        await axios.post("http://localhost:5009/api/authors", authorData);
      }
      onFormSubmit();
      handleCloseModal(); // Reset form fields after successful submission
    } catch (error) {
      setError("Error processing request. Please try again.");
      console.error("Error updating author:", error);
    }
  };

  const handleCloseModal = () => {
    setName(""); // Reset form fields
    setBiography("");
    setId(0);
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{author ? "Edit Author" : "Add Author"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={authorName}
              onChange={(e) => setName(e.target.value)}
              placeholder="Author Name"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Biography</Form.Label>
            <Form.Control
              as="textarea"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              placeholder="Biography"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            {author ? "Update Author" : "Add Author"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthorsModal;
