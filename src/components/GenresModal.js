import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../axiosConfig";

const GenresModal = ({ show, handleClose, onFormSubmit, genre }) => {
  const [Id, setGenreId] = useState(0);
  const [genreName, setGenreName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (genre) {
      setGenreId(genre.genreId);
      setGenreName(genre.genreName);
    } else {
      setGenreName("");
      setGenreId(0);
    }
    setError(""); // Reset error message when modal is opened
  }, [genre]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:5009/api/genres");
      const existingGenres = response.data;

      // Check for duplicate genre name
      const isDuplicate = existingGenres.some(
        (g) =>
          g.genreName.toLowerCase() === genreName.toLowerCase() &&
          (!genre || g.genreId !== genre.genreId)
      );

      if (isDuplicate) {
        setError("Genre name already exists.");
        return;
      }

      const genreData = {
        genreName: genreName,
      };

      const genreEditData = {
        genreId: Id,
        genreName: genreName,
      };

      if (genre) {
        // Editing an existing genre
        await axios.put(`http://localhost:5009/api/genres/${genre.genreId}`, genreEditData);
      } else {
        // Adding a new genre
        await axios.post("http://localhost:5009/api/genres", genreData);
      }

      onFormSubmit();
      handleCloseModal(); // Reset form fields after successful submission
    } catch (error) {
      console.error("Error saving genre:", error);
      setError("An error occurred while saving the genre.");
    }
  };

  const handleCloseModal = () => {
    setGenreName(""); // Reset form fields
    setGenreId(0);
    setError("");
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{genre ? "Edit Genre" : "Add Genre"}</Modal.Title>
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
            {error && <p className="text-danger mt-2">{error}</p>}
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            {genre ? "Save Changes" : "Add Genre"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GenresModal;
