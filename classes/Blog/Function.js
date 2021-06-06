const utils = require('../../utils');

const TEXT = require('../../text').TEXT;

/**
 * check user id, Blog fields are empty or not
 *
 * @param {Integer} userid
 * @param {String} title
 * @param {TEXT} content
 */
const emptyFieldCreateBlog = (userid, title, content) => {
  let errors = [];
  if (utils.isNumberNaN(userid)) {
    errors.push(TEXT.noUserId);
  }
  if (!title) {
    errors.push(TEXT.noTitle);
  }
  if (!content) {
    errors.push(TEXT.noContent);
  }
  return errors;
};

/**
 * check id, userid, blogContent are empty or not
 * @param {Integer} id
 * @param {Integer} userId
 * @param {TEXT} content
 * @returns
 */
const emptyFieldUpdateBlog = (id, userId, content) => {
  let errors = [];
  if (utils.isNumberNaN(id, userId)) {
    errors.push(TEXT.someFieldsMissing);
  }
  if (!content) {
    errors.push(TEXT.noBlogContent);
  }
  return errors;
};

module.exports = {
  emptyFieldCreateBlog,
  emptyFieldUpdateBlog,
};
