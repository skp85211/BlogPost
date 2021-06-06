const express = require('express');
const Router = express.Router();

const blog = require('../controller/blog');
const jwtAuth = require('../controller/jwtAuth');

//for creating new blog
Router.post('/create', jwtAuth.authenticateToken, blog.createBlog);

//get all blog post
Router.get('/all', blog.allLatestBlogs);

//get single blog post
Router.get('/getBlog', blog.readBlog);

//get filtered list of blogs
Router.get('/filteredBlog', blog.getFilteredBlogs);

//update blog post
Router.put('/update', jwtAuth.authenticateToken, blog.updateBlog);

//delete blog post
Router.delete('/delete', jwtAuth.authenticateToken, blog.deleteBlog);

module.exports = Router;
