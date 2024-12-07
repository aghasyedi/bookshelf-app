const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');  // Add this to work with file paths
const connectDB = require('./config/db');
const authRoutes = require('./routes/userRoutes');
const booksRoutes = require('./routes/bookRoutes');

dotenv.config();
connectDB();

const app = express();

// CORS (Allow your frontend origin for security)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Backend API routes
app.use('/api/auth', authRoutes);
app.use('/api', booksRoutes);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// All other routes should return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Set port from environment or default
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
