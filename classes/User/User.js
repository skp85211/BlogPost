const utils = require('../../utils');

const models = require('../../models/index');

/**
 * register and insert user details
 *
 * @param {String} reqName
 * @param {String} reqEmail
 * @param {String} reqPassword
 * @param {String} reqRole
 * @returns
 */
const signupUser = async (reqName, reqEmail, reqPassword, reqRole) => {
  try {
    let signup = await models.user.create({
      name: reqName,
      email: reqEmail,
      password: reqPassword,
      role: reqRole,
    });
    return utils.classResponse(true, signup, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

/**
 * Checks if user id exist or not
 *
 * @param {Integer} reqUserid
 * @returns
 */
const checkUserIdExists = async (reqUserid) => {
  try {
    let uidCheck = await models.user.findAll({
      attributes: ['id'],
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
 * search user with given email/phone number
 *
 * @param {String} reqEmail
 * @returns
 */
const searchUserwithEmail = async (reqEmail) => {
  try {
    let userSearch = await models.user.findAll({
      where: {
        email: reqEmail,
      },
    });
    return utils.classResponse(true, userSearch, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

/**
 * search user with user id
 *
 * @param {Integer} reqUserid
 * @returns
 */
const searchUserwithId = async (reqUserid) => {
  try {
    let userCheck = await models.user.findAll({
      attributes: ['id', 'role'],
      where: {
        id: reqUserid,
      },
    });
    return utils.classResponse(true, userCheck, '');
  } catch (error) {
    return utils.classResponse(false, {}, error);
  }
};

module.exports = {
  signupUser,
  checkUserIdExists,
  searchUserwithEmail,
  searchUserwithId,
};
