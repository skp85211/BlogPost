const utils = require('../utils');

const Blog = require('../classes/Blog/Blog');

const BlogFunction = require('../classes/Blog/Function');
const Constant = require('../classes/Blog/Constant').Constant;
const ERRORS = require('../errorConstants').ERRORS;

/**
 * create blog entry
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns
 */
exports.createBlog = async (req, res) => {
  let body = req.body;
  let reqUserid = parseInt(req.userid);
  let reqTitle = body.title || '';
  let reqContent = body.content || '';
  let errors = BlogFunction.emptyFieldCreateBlog(
    reqUserid,
    reqTitle,
    reqContent
  );
  if (errors.length) {
    return utils.sendResponse(res, false, {}, errors.join(','));
  }
  let useridCheckResponse = await Blog.checkUserIdExists(reqUserid);
  if (useridCheckResponse.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  if (useridCheckResponse.data.length == 0) {
    return utils.sendResponse(res, false, {}, ERRORS.noUserExists);
  }
  let author = useridCheckResponse.data[0].name;
  let newBlogResponse = await Blog.createBlog(
    reqUserid,
    reqTitle,
    author,
    reqContent
  );
  if (newBlogResponse.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  return utils.sendResponse(res, true, newBlogResponse.data, '');
};

/**
 * for ALL Blog Posts (latest blogs with pagination)
 *
 * @param {object} req
 * @param {object} res
 * @param {Object} next
 * @returns
 */
exports.allLatestBlogs = async (req, res) => {
  let pageno = parseInt(req.query.pageno || Constant.defaultPageNo);
  pageno = pageno - 1;
  let pageSize = Constant.limitBlogs;
  let offsetValue = pageno * pageSize;
  let rowsRecord = await Blog.allLatestBlogs(offsetValue);
  if (rowsRecord.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  return utils.sendResponse(res, true, rowsRecord.data, '');
};

/**
 * get single Blog Post
 *
 * @param {object} req
 * @param {object} res
 * @param {Object} next
 * @returns
 */
exports.readBlog = async (req, res) => {
  let reqBlogId = parseInt(req.query.blogId);
  if (utils.isNumberNaN(reqBlogId)) {
    return utils.sendResponse(res, false, {}, ERRORS.noBlogId);
  }
  let BlogResponse = await Blog.readBlog(reqBlogId);
  if (BlogResponse.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  return utils.sendResponse(res, true, BlogResponse.data, '');
};

/**
 * get filtered blog list by title
 *
 * @param {object} req
 * @param {object} res
 * @param {Object} next
 * @returns
 */
exports.getFilteredBlogs = async (req, res) => {
  let reqTitle = req.query.title;
  if (!reqTitle) {
    return utils.sendResponse(res, false, {}, ERRORS.noBlogTitle);
  }
  let BlogResponse = await Blog.getFilteredBlogs(reqTitle);
  if (BlogResponse.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  return utils.sendResponse(res, true, BlogResponse.data, '');
};

/**
 * update Blog post
 *
 * @param {object} req
 * @param {object} res
 * @param {Object} next
 * @returns
 */
exports.updateBlog = async (req, res) => {
  let body = req.body;
  let reqUserId = parseInt(req.userid);
  let reqBlogId = parseInt(body.blogId);
  let reqBlogContent = body.content || '';
  let errors = BlogFunction.emptyFieldUpdateBlog(
    reqBlogId,
    reqUserId,
    reqBlogContent
  );
  if (errors.length) {
    return utils.sendResponse(res, false, {}, errors.join(','));
  }
  let updateBlogResponse = await Blog.updateBlog(
    reqBlogId,
    reqUserId,
    reqBlogContent
  );
  if (updateBlogResponse.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  if (updateBlogResponse.data[0] == 0) {
    return utils.sendResponse(
      res,
      false,
      updateBlogResponse.data,
      ERRORS.permissionDenied
    );
  }
  return utils.sendResponse(res, true, updateBlogResponse.data, '');
};

/**
 * Delete blog post
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns
 */
exports.deleteBlog = async (req, res) => {
  let body = req.body;
  let reqBlogId = parseInt(body.blogId);
  let reqUserid = parseInt(req.userid);
  if (utils.isNumberNaN(reqBlogId, reqUserid)) {
    return utils.sendResponse(res, false, {}, ERRORS.someFieldsMissing);
  }
  let deleteBlogResponse = await Blog.deleteBlog(reqBlogId, reqUserid);
  if (deleteBlogResponse.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  if (deleteBlogResponse.data == 0) {
    return utils.sendResponse(
      res,
      false,
      deleteBlogResponse.data,
      ERRORS.permissionDenied
    );
  }
  return utils.sendResponse(res, true, deleteBlogResponse.data, '');
};

/**
 * Delete blog post by admin
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns
 */
exports.deleteBlogByAdmin = async (req, res) => {
  let body = req.body;
  let reqBlogId = parseInt(body.blogId);
  if (utils.isNumberNaN(reqBlogId)) {
    return utils.sendResponse(res, false, {}, ERRORS.someFieldsMissing);
  }
  let deleteBlogResponse = await Blog.deleteBlogByAdmin(reqBlogId);
  if (deleteBlogResponse.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  return utils.sendResponse(res, true, deleteBlogResponse.data, '');
};
