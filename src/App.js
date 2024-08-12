import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Books from "./components/Books";
import Authors from "./components/Authors";
import Genres from "./components/Genres";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./css/App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/genres" element={<Genres />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
