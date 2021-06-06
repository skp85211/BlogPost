const express = require('express');
const Router = express.Router();

const admin = require('../controller/admin');
const blog = require('../controller/blog');

const jwtAuth = require('../controller/jwtAuth');

//for admin login password authorisation and login
Router.post('/login/', admin.loginPasswordAuth);

//delete blog post by admin
Router.delete(
  '/blogDelete',
  jwtAuth.authenticateToken,
  admin.isAdmin,
  blog.deleteBlogByAdmin
);

module.exports = Router;
