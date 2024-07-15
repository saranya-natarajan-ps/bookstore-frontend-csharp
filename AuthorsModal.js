// src/components/AuthorsModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../axiosConfig";

const AuthorsModal = ({ show, handleClose, author, onFormSubmit }) => {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");

  useEffect(() => {
    if (author) {
      setName(author.name);
      setBiography(author.biography);
    } else {
      setName("");
      setBiography("");
    }
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorData = {
      name,
      biography,
    };

    if (author) {
      // Update existing author
      try {
        await axios.put(
          `http://localhost:3001/authors/${author.author_id}`,
          authorData
        );
        onFormSubmit();
      } catch (error) {
        console.error("Error updating author:", error);
      }
    } else {
      // Add new author
      try {
        await axios.post("http://localhost:3001/authors", authorData);
        onFormSubmit();
      } catch (error) {
        console.error("Error adding author:", error);
      }
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="bg-danger-subtle" closeButton>
        <Modal.Title>{author ? "Edit Author" : "Add Author"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold mt-2">Biography</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              placeholder="Biography"
              required
            />
          </Form.Group>
          <Button variant="primary mt-2" type="submit">
            {author ? "Update Author" : "Add Author"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthorsModal;
