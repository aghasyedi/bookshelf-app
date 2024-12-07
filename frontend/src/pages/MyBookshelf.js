import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCurrentlyReadingBooks, deleteBookFromShelf } from "../api/index";

const MyBookshelf = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const fetchBookshelf = async () => {
      try {
        const fetchedBooks = await fetchCurrentlyReadingBooks();
        setBooks(fetchedBooks);
        
        const storedProgress = JSON.parse(localStorage.getItem("bookProgress")) || {};
        setProgress(storedProgress);
      } catch (error) {
        console.error("Error fetching currently reading books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookshelf();
  }, []);

  // Function to handle deleting a book from the shelf
  const handleDelete = async (bookId) => {
    try {
      await deleteBookFromShelf(bookId);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));

      setProgress((prevProgress) => {
        const newProgress = { ...prevProgress };
        delete newProgress[bookId];
        localStorage.setItem("bookProgress", JSON.stringify(newProgress));
        return newProgress;
      });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Function to handle updating progress
  const handleProgressUpdate = (bookId) => {
    setProgress((prev) => {
      const currentProgress = prev[bookId] || 0;
      const newProgress = currentProgress < 100 ? currentProgress + 10 : 100;

      const updatedProgress = {
        ...prev,
        [bookId]: newProgress,
      };

      // Save the updated progress to localStorage
      localStorage.setItem("bookProgress", JSON.stringify(updatedProgress));

      return updatedProgress;
    });
  };

  return (
    <div className="bookshelf-container">
      <div className="bookshelf-header">
        <h2>Currently Reading Books</h2>
        <Link to="/">Search Books</Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bookshelf-items">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book._id} className="bookshelf-list">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="book-thumbnail"
                />
                <div>
                  <h3>{book.title}</h3>
                  <p>
                    Authors:{" "}
                    {book.authors.length > 0
                      ? book.authors.join(", ")
                      : "Unknown"}
                  </p>
                  <p>Progress: {progress[book._id] || 0}%</p>
                  {(progress[book._id] || 0) < 100 ? (
                    <button onClick={() => handleProgressUpdate(book._id)} className="progressBtn">
                      Update Progress
                    </button>
                  ) : (
                    <button disabled>Completed</button>
                  )}
                  <button onClick={() => handleDelete(book._id)} className="finishedBtn">
                    I've Finished
                  </button>
                  <br />
                  <Link to={`/bookshelf/${book._id}`}>View Details</Link>
                </div>
              </div>
            ))
          ) : (
            <p className="noBooks">No currently reading books. Please search books and add in your bookshelf!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookshelf;
