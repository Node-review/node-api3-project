const express = require('express');

const Post = require('./postDb.js');

const { validatePost, validatePostId } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.get();
    res.status(200).json(posts);
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to get posts data' })
  }
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {
    const removed = await Post.remove(req.params.id)
    res.status(200).json(removed)
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to remove post' })
  }
});

router.put('/:id', validatePostId, validatePost, async (req, res) => {
  try {
    const updated = await Post.update(req.params.id, req.body);
    res.status(200).json(updated);
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to update post' })
  }
});


module.exports = router;