# MERN Bookshelf Application

This project is a **Bookshelf** web application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). It allows users to search for books, add them to their personal bookshelf, review books, and manage their reading progress.

## Features

- **User Authentication**: Sign up and log in with JWT-based authentication.
- **Book Search**: Search for books using the Google Books API without requiring authentication.
- **My Bookshelf**:
  - Add books to your personal bookshelf (authenticated users only).
  - Update your reading progress.
  - Mark books as finished or remove them from your bookshelf.
- **Book Details**: View detailed information about each book, including user reviews.
  - Leave a review with a rating for books (logged-in users only).
  - Average rating for each book based on user reviews.
- **Protected Routes**:
  - **MyBookshelf** and **Book Details** pages are protected for logged-in users only.
  - Non-logged-in users are redirected to the login page if they attempt to access these protected routes.
- **Responsive Design**: Styled with CSS to ensure responsiveness across devices.

## Technologies Used

### Frontend

- **React.js**: For building the user interface.
- **CSS**: For styling the application.
- **React Router**: For client-side routing and navigation.
- **Google Books API**: To fetch book data for search functionality.

### Backend

- **Node.js & Express.js**: For building the RESTful API.
- **MongoDB & Mongoose**: For database management and modeling the book and user data.
- **JWT (JSON Web Tokens)**: For authentication and protecting routes.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Bookshelf.git
   cd Bookshelf
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Set up environment variables:

- Create a .env file in the root of the backend folder.
- Add the following:
  ```makefile
  MONGO_URI=your-mongodb-uri
  JWT_SECRET=your-jwt-secret
  GOOGLE_BOOKS_API_KEY=your-google-books-api-key
  ```

5. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
6. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

## API Endpoints

- **POST /api/auth/signup:** Register a new user.
- **POST /api/auth/login:** Authenticate a user and generate a JWT.
- **GET /api/books/search:** Search for books using the Google Books API.
- **POST /api/bookshelf:** Add a book to the user's bookshelf (Protected).
- **GET /api/bookshelf:** Get the list of books in the user's bookshelf (Protected).
- **POST /api/bookshelf/:id/review:** Add a review for a book (Protected).

## Usage

1. Visit the home page where you can search for books.
2. Only logged-in users can add books to their personal bookshelf and leave reviews.
3. Non-authenticated users can browse and search for books but cannot access protected routes like "MyBookshelf" and "BookDetails."

## Future Enhancements

- Add social media logins (e.g., Google, Facebook).
- Update Progress with database.
- Implement pagination for book searches.
- Improve UI with additional animations and themes.

## License

This project is licensed under the MIT License.
