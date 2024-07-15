// src/components/GenresModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../axiosConfig";

const GenresModal = ({ show, handleClose, onFormSubmit }) => {
  const [genreName, setGenreName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const genreData = {
      genre_name: genreName,
    };

    try {
      await axios.post("http://localhost:3001/genres", genreData);
      onFormSubmit();
    } catch (error) {
      console.error("Error adding genre:", error);
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Genre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Genre Name</Form.Label>
            <Form.Control
              type="text"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
              placeholder="Genre Name"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Genre
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GenresModal;
