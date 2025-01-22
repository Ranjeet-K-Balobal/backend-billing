const express = require('express');
//const pool = require('./db'); // Import the database connection logic

const authRoutes = require('./routes/authRoutes');



const app = express();
const port = 6000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
