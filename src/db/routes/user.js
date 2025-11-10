// routes/user.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// FIND
router.get('/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  }
  catch (err) {
    return res.status(404).json({ error: 'User not found' });
  }
})

// UPDATE
router.patch('/update/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    return res.status(404).json({ error: 'User not found' });
  }
})

// Filter
router.get('/name/:name', async (req, res) => {
  try {
  const decodedName = decodeURIComponent(req.params.name);
  
  const user = await User.find({ name: decodedName });
  if (user.length === 0) return res.status(404).json({ error: "Users not found" });
  res.json(user);
  }
  catch (err) {
    return res.status(404).json({ error: 'Users not found' });
  }
})

// DELETE
router.delete('/delete/:id', async (req, res) => {
  try {
    const delRes = await User.findByIdAndDelete(req.params.id);
    if(!delRes) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    return res.status(404).json({ error: 'User not found' });
  }
})

module.exports = router;
