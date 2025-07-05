const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

router.put('/preferences', auth, async (req, res) => {
  try {
    if (!req.body.preferences) {
      return res.status(400).json({ error: 'No preferences provided' });
    }

    const userBefore = await User.findById(req.user.id);
    if (!userBefore) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { preferences: req.body.preferences },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/me/profile', auth, async (req, res) => {
  const { name, birthday } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, birthday },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 