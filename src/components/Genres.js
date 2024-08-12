import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import GenresModal from "./GenresModal";
import { Button, Table, Form } from "react-bootstrap";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [editingGenre, setEditingGenre] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (filter.length >= 3) {
      setFilteredGenres(
        genres.filter(
          (genre) =>
            genre.genreName.toLowerCase().includes(filter.toLowerCase()) ||
            genre.genreId.toString().includes(filter)
        )
      );
    } else {
      setFilteredGenres(genres); // Show all genres if filter length is less than 3
    }
  }, [filter, genres]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:5009/api/genres");
      setGenres(response.data);
      setFilteredGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setEditingGenre(null); // Reset editingGenre when adding a new genre
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = () => {
    fetchGenres(); // Refresh the list of genres after adding or editing a genre
    handleCloseModal();
  };

  const handleEditClick = (genre) => {
    setEditingGenre(genre);
    setShowModal(true);
  };

  return (
    <div className="container">
      <h1 className="my-4">Genres</h1>
      <Button variant="info" onClick={handleShowModal}>
        Add Genre
      </Button>
      <div className="mb-3 mt-3">
        <Form.Control
          type="text"
          placeholder="Filter by genre name or genre ID"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filter.length > 0 && filter.length < 3 && (
          <p className="text-muted mt-2">Please enter at least 3 characters to filter.</p>
        )}
      </div>
      <div style={{ maxHeight: "1000px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Genre Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGenres.map((genre) => (
              <tr key={genre.genreId}>
                <td>{genre.genreId}</td>
                <td>{genre.genreName}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleEditClick(genre)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <GenresModal
        show={showModal}
        handleClose={handleCloseModal}
        onFormSubmit={handleFormSubmit}
        genre={editingGenre} // Pass the genre to the modal if editing
      />
    </div>
  );
};

export default Genres;
