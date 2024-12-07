import axios from "axios";

const API_URL = "https://bookshelf-yczp.onrender.com/api";

// Function to signup 
export const signupUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Signup failed";
  }
};


// Function to login 
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};


// Function to search books (no authentication needed)
export const searchBooks = async (query) => {
  const response = await fetch(`${API_URL}/books?q=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};


// Function to add a book to the user's shelf (requires authentication)
export const addBookToShelf = async (book) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const response = await fetch(`${API_URL}/bookshelf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      googleBookId: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
    }),
  });

  if (response.ok) {
    console.log("Book added to shelf!");
  } else {
    console.error("Error adding book to shelf");
  }
};


//Fetching currently reading books 
export const fetchCurrentlyReadingBooks = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const response = await fetch(`${API_URL}/bookshelf/currently-reading`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch currently reading books");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching currently reading books:", error);
    throw error; 
  }
};


// Function to delete a book from the user's shelf (requires authentication)
export const deleteBookFromShelf = async (bookId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const response = await fetch(`${API_URL}/bookshelf/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }
};


// Get book details by ID
export const getBookDetails = async (bookId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  try {
    const response = await fetch(`${API_URL}/bookshelf/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};


// Submit review for a book
export const submitReview = async (bookId, reviewData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  try {
    const response = await fetch(`${API_URL}/bookshelf/${bookId}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit review");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};
