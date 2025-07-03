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

router.put('/me/preferences', auth, async (req, res) => {
  const { preferences } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { preferences },
    { new: true }
  ).select('-password');
  res.json(user);
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