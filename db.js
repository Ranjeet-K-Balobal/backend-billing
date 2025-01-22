const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Create a new pool instance to connect to the database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Ensure SSL works for cloud-hosted databases like Supabase
    },
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
