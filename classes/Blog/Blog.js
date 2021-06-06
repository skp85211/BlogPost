const utils = require('../../utils');

const Constant = require('./Constant').Constant;
const models = require('../../models/index');

/**
 * Checks if user id exist or not
 *
 * @param {Integer} reqUserid
 * @returns
 */
const checkUserIdExists = async (reqUserid) => {
  try {
    let uidCheck = await models.user.findAll({
      attributes: ['id', 'name'],
      where: {
        id: reqUserid,
      },
    });
    return utils.classResponse(true, uidCheck, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

/**
 * create New Blog
 *
 * @param {Integer} reqUserid
 * @param {String} reqTitle
 * @param {String} reqAuthor
 * @param {String} reqContent
 * @returns
 */
const createBlog = async (reqUserid, reqTitle, reqAuthor, reqContent) => {
  try {
    let newBlog = await models.blog.create({
      userId: reqUserid,
      title: reqTitle,
      author: reqAuthor,
      content: reqContent,
    });
    return utils.classResponse(true, newBlog, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

/**
 * for ALL Blogs (latest ordered Blogs with pagination)
 *
 * @param {Integer} oset
 * @returns
 */
const allLatestBlogs = async (oset) => {
  try {
    let allLatestBlogs = await models.blog.findAndCountAll({
      order: [['createdAt', 'DESC']],
      attributes: ['title', 'author'],
      offset: oset,
      limit: Constant.limitBlogs,
    });
    let rows = allLatestBlogs.rows;
    return utils.classResponse(true, rows, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

/**
 * gets single blog post to read
 *
 * @param {Integer} reqBlogId
 * @returns
 */
const readBlog = async (reqBlogId) => {
  try {
    let blog = await models.blog.findAll({
      where: {
        id: reqBlogId,
      },
      attributes: ['title', 'author', 'content'],
    });
    return utils.classResponse(true, blog, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

/**
 * gets filtered list of post by title
 *
 * @param {Integer} reqTitle
 * @returns
 */
const getFilteredBlogs = async (reqTitle) => {
  try {
    let blog = await models.blog.findAll({
      where: {
        title: reqTitle,
      },
      attributes: ['title', 'author', 'content'],
    });
    return utils.classResponse(true, blog, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

/**
 * Updates Blog content
 *
 * @param {Integer} reqId //blog id
 * @param {Integer} reqUserid //user id
 * @param {String} reqBlogContent //blog content to update
 * @returns
 */
const updateBlog = async (reqId, reqUserid, reqBlogContent) => {
  try {
    let updateBlog = await models.blog.update(
      { content: reqBlogContent },
      {
        where: {
          id: reqId,
          userId: reqUserid,
        },
      }
    );
    return utils.classResponse(true, updateBlog, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

/**
 * Delete Existing blog from database
 *
 * @param {Integr} reqId //blog id
 * @param {Integer} reqUserid //user id
 * @returns
 */
const deleteBlog = async (reqId, reqUserid) => {
  try {
    let deleteBlog = await models.blog.destroy({
      where: {
        id: reqId,
        userId: reqUserid,
      },
    });
    return utils.classResponse(true, deleteBlog, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

/**
 * Delete Existing blog from database BY ADMIN
 *
 * @param {Integr} reqId //blog id
 * @returns
 */
const deleteBlogByAdmin = async (reqId) => {
  try {
    let deleteBlog = await models.blog.destroy({
      where: {
        id: reqId,
      },
    });
    return utils.classResponse(true, deleteBlog, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

module.exports = {
  checkUserIdExists,
  createBlog,
  allLatestBlogs,
  readBlog,
  getFilteredBlogs,
  updateBlog,
  deleteBlog,
  deleteBlogByAdmin,
};
