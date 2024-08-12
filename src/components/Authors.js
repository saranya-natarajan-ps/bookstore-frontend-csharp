import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import AuthorsModal from "./AuthorsModal";
import { Button, Table, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "../css/Authors.css";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    fetchAuthors();
  }, []);

  useEffect(() => {
    if (filter.length >= 3) {
      setFilteredAuthors(
        authors.filter(
          (author) =>
            (author.authorName &&
              author.authorName.toLowerCase().includes(filter.toLowerCase())) ||
            (author.authorId &&
              author.authorId.toString().includes(filter))
        )
      );
    } else {
      setFilteredAuthors(authors);
    }
  }, [filter, authors]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:5009/api/authors");
      setAuthors(response.data);
      setFilteredAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  /*const deleteAuthor = async (id) => {
    try {
      await axios.delete(`http://localhost:5009/api/authors/${id}`);
      fetchAuthors();
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };*/

  const handleEditClick = (author) => {
    setEditingAuthor(author);
    setShowModal(true);
  };

  const handleFormSubmit = () => {
    setEditingAuthor(null);
    fetchAuthors();
  };

  const handleShowModal = () => {
    setShowModal(true);
    setEditingAuthor(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAuthor(null);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentAuthors = filteredAuthors.slice(offset, offset + itemsPerPage);

  /*const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      deleteAuthor(id);
    }
  };*/

  return (
    <div className="container">
      <h1 className="my-4">Authors</h1>
      <Button variant="info" onClick={handleShowModal}>
        Add Author
      </Button>
      <div className="mb-3 mt-3">
        <Form.Control
          type="text"
          placeholder="Filter by name or author ID"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filter.length < 3 && filter.length > 0 && (
          <p className="text-muted mt-2">Please enter at least 3 characters to filter.</p>
        )}
      </div>
      <div style={{ maxHeight: "800px", overflowY: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Biography</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAuthors.map((author) => (
              <tr key={author.authorId}>
                <td>{author.authorId}</td>
                <td className="actions-column">{author.authorName}</td>
                <td>{author.biography}</td>
                <td className="actions-column">
                  <Button
                    variant="primary"
                    onClick={() => handleEditClick(author)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(filteredAuthors.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
        />
      </div>
      <AuthorsModal
        show={showModal}
        handleClose={handleCloseModal}
        author={editingAuthor}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Authors;
