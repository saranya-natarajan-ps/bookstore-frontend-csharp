// src/components/Genres.js
import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import GenresModal from "./GenresModal";
import { Button, Table, Form } from "react-bootstrap";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredGenres, setFilteredGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    setFilteredGenres(
      genres.filter(
        (genre) =>
          genre.genre_name.toLowerCase().includes(filter.toLowerCase()) ||
          genre.genre_id.toString().includes(filter)
      )
    );
  }, [filter, genres]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:3001/genres");
      setGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      </div>
      <div style={{ maxHeight: "1000px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Genre Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredGenres.map((genre) => (
              <tr key={genre.genre_id}>
                <td>{genre.genre_id}</td>
                <td>{genre.genre_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <GenresModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Genres;
