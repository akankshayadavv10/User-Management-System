// routes/members.js
const express = require('express');
const router = express.Router();
const Member = require('../models/Member.js');

// POST /api/members
router.post('/', async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const saved = await newMember.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Error saving member', details: err.message });
  }
});
77
module.exports = router;
