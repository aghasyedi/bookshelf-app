import React, { useState } from "react";
import { searchBooks, addBookToShelf } from "../api";

const BookSearch = ({ onBookAdded, isLoggedIn }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await searchBooks(query);
      setBooks(results);
      setError("");
    } catch (err) {
      setError("No books found. Please try a different search.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (book) => {
    try {
      await addBookToShelf(book);
      onBookAdded();
      alert("Book added successfully");
    } catch (err) {
      setError("Error adding book to shelf");
    }
  };

  return (
    <div className="book-search-container">
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="book-search-input"
            required
          />
          <button type="submit" className="book-search-button">
            Search
          </button>
        </form>
      </div>
      {loading && <p>Loading Books...</p>}
      {error && <p>{error}</p>}
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={`${book.volumeInfo.title} cover`}
              />
            )}
            <div>
              <h3>{book.volumeInfo.title.substring(0, 20)}</h3>
              <p>
                Author:{" "}
                {book.volumeInfo.authors
                  ? `${book.volumeInfo.authors.join(", ").substring(0, 20)}...`
                  : "Unknown"}
              </p>
              {isLoggedIn && (
                <button
                  onClick={() => handleAddBook(book)}
                  className="add-to-shelf-button"
                >
                  Add to Read
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
