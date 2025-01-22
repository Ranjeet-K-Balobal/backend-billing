const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT (store securely in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authController = {
  // Sign up logic
  async signUp(req, res) {
    const { username, email, password, role, company_id } = req.body;

    try {
      // Check if user already exists
      const existingUser = await userModel.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create a new user
      const user = await userModel.createUser({ username, email, password, role, company_id });
      res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  },

   // Sign in logic
   async signIn(req, res) {
    const { username, password, role } = req.body; // Check username and role

    try {
      // Find user by both username and role
      const user = await userModel.findUserByUsernameAndRole(username, role);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign(
        { user_id: user.user_id, role: user.role, company_id: user.company_id },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  },
};

module.exports = authController;
