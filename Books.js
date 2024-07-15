import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import BooksModal from "./BooksModal";
import BookDetailsModal from "./BookDetailsModal";
import { Button, Form, Card, Row, Col, Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "../css/Books.css"; // Import your CSS file

const Books = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12; // Number of items per page

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(filter.toLowerCase()) ||
          (book.Author &&
            book.Author.name.toLowerCase().includes(filter.toLowerCase())) ||
          book.Genre.genre_name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, books]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/books");
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEditClick = (e, book) => {
    e.stopPropagation();
    setEditingBook(book);
    setShowModal(true);
  };

  const handleFormSubmit = () => {
    setEditingBook(null);
    fetchBooks();
  };

  const handleShowModal = () => {
    setShowModal(true);
    setEditingBook(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBook(null);
  };

  const handleImageClick = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentBooks = filteredBooks.slice(offset, offset + itemsPerPage);

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(id);
    }
  };

  return (
    <Container className="books-container">
      <h1 className="my-4">Books</h1>
      <Button
        type="button"
        variant="info"
        onClick={handleShowModal}
        className="normal-btn" // Add a class for custom styling if needed
      >
        Add Book
      </Button>
      <div className="mb-3 mt-3">
        <Form.Control
          type="text"
          placeholder="Filter by title, author, or genre"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <Row>
        {currentBooks.map((book) => (
          <Col key={book.book_id} sm={6} md={4} lg={3} className="mb-3">
            <Card onClick={() => handleImageClick(book)}>
              <Card.Img variant="top" src={book.image} alt={book.title} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  {book.Author ? book.Author.name : "Unknown Author"}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={(e) => handleEditClick(e, book)}
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  className="m-lg-2"
                  onClick={(e) => handleDeleteClick(e, book.book_id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="mt-4 d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(filteredBooks.length / itemsPerPage)}
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
      <BooksModal
        show={showModal}
        handleClose={handleCloseModal}
        book={editingBook}
        onFormSubmit={handleFormSubmit}
      />
      <BookDetailsModal
        show={showDetailsModal}
        handleClose={handleCloseDetailsModal}
        book={selectedBook}
      />
    </Container>
  );
};

export default Books;
