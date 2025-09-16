// progress.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Models
const User = mongoose.model('User');
const Progress = mongoose.model('Progress');

// JWT Middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// GET user's progress
router.get('/', auth, async (req, res) => {
  try {
    let progressData = await Progress.findOne({ userId: req.user.id });
    if (!progressData) {
      progressData = new Progress({
        userId: req.user.id,
        habits: { sleep: 0, exercise: 0, water: 0, study: 0 },
      });
      await progressData.save();
    }
    res.json(progressData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST: Update progress (incremental) - for + and - buttons
router.post('/', auth, async (req, res) => {
  try {
    const { habit, action, value } = req.body;
    
    // Find existing progress or create new one
    let progressData = await Progress.findOne({ userId: req.user.id });
    if (!progressData) {
      progressData = new Progress({
        userId: req.user.id,
        habits: { sleep: 0, exercise: 0, water: 0, study: 0 },
      });
    }

    // Update the specific habit
    if (action === 'increment') {
      progressData.habits[habit] += value || 1;
    } else if (action === 'decrement') {
      progressData.habits[habit] = Math.max(0, progressData.habits[habit] - (value || 1));
    } else if (action === 'set') {
      progressData.habits[habit] = value || 0;
    }

    await progressData.save();
    res.json(progressData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST: Set absolute values (for form updates)
router.post('/set', auth, async (req, res) => {
  try {
    // Find existing progress or create new one with default values
    let progressData = await Progress.findOne({ userId: req.user.id });
    if (!progressData) {
      progressData = new Progress({
        userId: req.user.id,
        habits: { sleep: 0, exercise: 0, water: 0, study: 0 },
      });
    }
    
    // Update with the provided values
    progressData.habits = { ...progressData.habits, ...req.body };
    await progressData.save();
    
    res.json(progressData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;