const utils = require('../utils');
const md5 = require('md5');
const User = require('../classes/User/User');

const UserFunction = require('../classes//User/Function');
const ERRORS = require('../errorConstants').ERRORS;
const jwtauth = require('./jwtAuth');

/**
 * Verify password of existing user from their email id and logs in
 *
 * @param {object} req
 * @param {object} res
 * @param {Object} next
 * @returns
 */
exports.loginPasswordAuth = async (req, res) => {
  let body = req.body;
  let reqEmail = body.email || '';
  let reqPassword = body.password || '';
  let errors = UserFunction.emptyLoginField(reqEmail, reqPassword);
  if (errors.length) {
    return utils.sendResponse(res, false, {}, errors.join(','));
  }
  let loginResponse = await User.searchUserwithEmail(reqEmail);
  if (loginResponse.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  let login = loginResponse.data[0];
  if (loginResponse.data.length == 0) {
    return utils.sendResponse(res, false, {}, ERRORS.noUserExists);
  }
  if (login.password != md5(reqPassword)) {
    return utils.sendResponse(res, false, {}, ERRORS.noPasswordMatch);
  }
  if (login.role !== 'admin') {
    return utils.sendResponse(res, false, {}, ERRORS.notAdmin);
  } else {
    let accessToken = jwtauth.generateAccessToken(login.id);
    let data = {
      userId: login.id,
      name: login.name,
      email: login.email,
      token: accessToken,
    };
    return utils.sendResponse(res, true, data, '');
  }
};

/**
 * Checks if the user is admin or not
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns
 */
exports.isAdmin = async (req, res, next) => {
  let reqUserid = parseInt(req.userid);
  if (utils.isNumberNaN(reqUserid)) {
    return utils.sendResponse(res, false, {}, ERRORS.someFieldsMissing);
  }
  let searchResponse = await User.searchUserwithId(reqUserid);
  if (searchResponse.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  if (searchResponse.data.length == 0) {
    return utils.sendResponse(res, false, {}, ERRORS.noUserExists);
  }
  let search = searchResponse.data[0];
  if (search.role !== 'admin') {
    return utils.sendResponse(res, false, {}, ERRORS.notAdmin);
  }
  next();
};
