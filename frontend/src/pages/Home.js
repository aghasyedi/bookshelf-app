import React from "react";
import BookSearch from "../components/BookSearch";
import { Link } from "react-router-dom";

const Home = ({ onBookAdded, isLoggedIn }) => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-header">
          <h1 className="home-title">Welcome to Bookshelf</h1>
          <p className="home-subtitle">
            Find and organize your favorite books.
          </p>
          {isLoggedIn && <Link to="/mybookshelf">Check Your Current Reading Books</Link>}
        </div>

        <section className="book-search-section">
          <BookSearch onBookAdded={onBookAdded} isLoggedIn={isLoggedIn} />
        </section>
      </div>
    </div>
  );
};

export default Home;
