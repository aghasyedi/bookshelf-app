import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyBookshelf from "./pages/MyBookshelf";
import BookDetails from "./pages/BookDetails";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the new ProtectedRoute component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username);
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUsername(user.username);
  };

  const handleBookAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} username={username} />
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Home onBookAdded={handleBookAdded} isLoggedIn={isLoggedIn} />}
          />
          {/* Protect the MyBookshelf and BookDetails routes */}
          <Route
            path="/mybookshelf"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MyBookshelf key={refresh} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookshelf/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <BookDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
