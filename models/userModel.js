const pool = require('../db');
const bcrypt = require('bcrypt');

const userModel = {
  // Create a new user
  async createUser({ username, email, password, role, company_id }) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const query = `
      INSERT INTO users (username, email, password, role, company_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [username, email, hashedPassword, role, company_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
 // Find user by both username and role
 async findUserByUsernameAndRole(username, role) {
    const query = 'SELECT * FROM users WHERE username = $1 AND role = $2';
    const values = [username, role];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0]; // Return the first matching user, or null if no match
    } catch (err) {
      console.error('Error finding user:', err);
      throw err; // Propagate error to be handled in the controller
    }
  },
  
  // Find a user by email
  async findUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },
};

module.exports = userModel;
