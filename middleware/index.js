const User = require('../users/userDb.js');
const Post = require('../posts/postDb.js');

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost
}

function logger(req, res, next) {
  const date = Date(Date.now())
  console.log(`${req.method} Request to ${req.originalUrl} on ${date}`)
  next();
};

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: 'Invalid user id' })
    }
  }
  catch (err) {
    res.status(500).json({ message: 'Failed to process the request' })
  }
};

function validateUser(req, res, next) {
  const user = req.body;
  if (!user && !Object.entries(user).length) { // Object.entries checking if the body is defined instead of an empty object
    res.status(400).json({ message: 'Missing user data' })
  } else if (!user.name) {
    res.status(400).json({ message: 'Missing required name field' })
  } else {
    next();
  }
};

async function validatePostId(req, res, next) {
  const { id } = req.params;
  const post = await Post.getById(id)
  try {
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: 'Invalid post id' })
    }
  }
  catch (err) {
    res.status(500).json({ err, message: 'Failed to process the request' })
  }
};

function validatePost(req, res, next) {
  const post = req.body;
  if (post && Object.keys(post).length) {
    next()
  } else if (!post.text) {
    res.status(400).json({ message: 'Missing required text field' })
  } else {
    res.status(400).json({ message: 'Missing post data' })
  }
};

