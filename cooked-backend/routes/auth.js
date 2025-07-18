const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name, birthday } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, name, birthday });
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Return user data (excluding password) and token
    res.status(201).json({ 
      token,
      user: {
        email: user.email,
        name: user.name,
        birthday: user.birthday,
        preferences: user.preferences
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { email: user.email, name: user.name, birthday: user.birthday, preferences: user.preferences } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 