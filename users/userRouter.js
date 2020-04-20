const express = require('express');

const User = require('./userDb.js');
const Post = require('../posts/postDb.js');

const { validateUser, validateUserId, validatePost } = require('../middleware');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  try {
    const inserted = await User.insert(req.body);
    res.status(201).json(inserted)
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to insert user data' })
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    const inserted = await Post.insert(req.body);
    res.status(201).json(inserted);
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to add posts to a specified user' })
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.get();
    res.status(200).json(users)
  }
  catch (err) {
    res.status(500).json({ message: 'Failed to retrieve users data' })
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // Middleware taken place of validating ID
  // as well as saving it to the req.user object
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await User.getUserPosts(req.params.id);
    res.status(200).json(posts)
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to retrieve user posts' })
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const removed = await User.remove(req.params.id);
    res.status(200).json(removed);
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to remove user data' })
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try {
    const updated = await User.update(req.params.id, req.body);
    res.status(200).json(updated);
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to update user data' })
  }
});

module.exports = router;