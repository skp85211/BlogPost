const utils = require('../utils');
const md5 = require('md5');
const jwtauth = require('./jwtAuth');

const User = require('../classes/User/User');
const UserFunction = require('../classes//User/Function');
const ERRORS = require('../errorConstants').ERRORS;

/**
 * signup/ insert new user details
 *
 * @param {object} req
 * @param {object} res
 * @param {Object} next
 * @returns
 */
exports.signupUser = async (req, res) => {
  let body = req.body;
  let reqName = body.name || '';
  let reqEmail = body.email || '';
  let reqPassword = body.password || '';
  let reqRole = 'user';
  let errors = UserFunction.emptySignupField(reqName, reqEmail, reqPassword);
  if (errors.length) {
    return utils.sendResponse(res, false, {}, errors.join(','));
  }
  reqPassword = md5(reqPassword);
  let signupResponse = await User.signupUser(
    reqName,
    reqEmail,
    reqPassword,
    reqRole
  );
  if (signupResponse.success == false) {
    return utils.sendResponse(res, false, {}, ERRORS.dbError);
  }
  return utils.sendResponse(res, true, {}, '');
};

/**
 * Verify password of existing user from their email id
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
  } else {
    let accessToken = jwtauth.generateAccessToken(login.id);
    let data = {
      token: accessToken,
    };
    return utils.sendResponse(res, true, data, '');
  }
};
