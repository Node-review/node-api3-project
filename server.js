const express = require('express');
const helmet = require('helmet');
// const morgan = require('morgan');     // use as logger
const server = express();
const { logger } = require('./middleware');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

server.use(express.json());
server.use(helmet());
// server.use(morgan('dev'));         // use as logger
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
