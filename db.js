const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Create a new pool instance to connect to the database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use DATABASE_URL for the connection string
    max: 15, // Match Supabase's default pool size for Nano
    idleTimeoutMillis: 30000, // Time before an idle connection is closed (30 seconds)
    connectionTimeoutMillis: 2000, // Timeout for new connections (2 seconds)
});

// Test the database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connected to the database successfully');
        release(); // Release the client back to the pool
    }
});

// Export the pool instance for use in other files
module.exports = pool;