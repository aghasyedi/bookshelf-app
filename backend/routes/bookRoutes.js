const express = require("express");
const router = express.Router();
const { 
  fetchBooks, 
  addBookToShelf, 
  getCurrentlyReading, 
  deleteBookFromShelf, 
  addReviewToBook, 
  getBookWithReviews 
} = require("../controllers/bookController");
const { protect } = require("../middleware/authMiddleware");

// Fetch books from Google Books API
router.get("/books", fetchBooks);

// Add a book to the user's bookshelf
router.post("/bookshelf", protect, addBookToShelf);

// Get currently reading books
router.get("/bookshelf/currently-reading", protect, getCurrentlyReading);

// Delete a book from the user's bookshelf
router.delete("/bookshelf/:id", protect, deleteBookFromShelf);

// Add a review to a book
router.post("/bookshelf/:id/review", protect, addReviewToBook);

// Get a specific book with its reviews
router.get("/bookshelf/:id", protect, getBookWithReviews);

module.exports = router;
