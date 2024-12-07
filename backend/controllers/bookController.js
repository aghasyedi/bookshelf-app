const fetch = require('node-fetch');
const Book = require('../models/bookModels');

// Fetch books from Google Books API
const fetchBooks = async (req, res) => {
  const searchTerm = req.query.q;
  const apiKey = process.env.API_KEY;

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
    );
    const data = await response.json();

    if (!data.items) {
      return res.status(404).json({ message: 'No books found' });
    }

    res.json(data.items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
};

// Add a book to the user's bookshelf
const addBookToShelf = async (req, res) => {
  const { title, authors, thumbnail, averageRating } = req.body;
  const userId = req.user._id;

  const book = new Book({
    title,
    authors: Array.isArray(authors) ? authors : [authors].filter(Boolean),
    thumbnail,
    averageRating,
    userId,
  });

  try {
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get currently reading books
const getCurrentlyReading = async (req, res) => {
  const userId = req.user._id;
  try {
    const currentlyReadingBooks = await Book.find({ userId });
    res.json(currentlyReadingBooks);
  } catch (error) {
    console.error('Error fetching currently reading books:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a book from the user's bookshelf
const deleteBookFromShelf = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book from bookshelf' });
  }
};

// Add a review to a book
const addReviewToBook = async (req, res) => {
  const { text, rating } = req.body;
  const userId = req.user._id;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Add the review
    book.reviews.push({ userId, text, rating });

    // Calculate new average rating
    const totalRatings = book.reviews.length;
    const totalRatingValue = book.reviews.reduce((acc, review) => acc + review.rating, 0);
    book.averageRating = totalRatingValue / totalRatings;

    await book.save();

    const updatedBook = await Book.findById(req.params.id).populate({
      path: 'reviews.userId',
      select: 'username',
    });

    res.status(201).json(updatedBook);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific book with its reviews
const getBookWithReviews = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews.userId', 'name');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  fetchBooks,
  addBookToShelf,
  getCurrentlyReading,
  deleteBookFromShelf,
  addReviewToBook,
  getBookWithReviews,
};
