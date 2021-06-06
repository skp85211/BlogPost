const TEXT = require('../../text').TEXT;

/**
 * check if email or password field is empty or not
 *
 * @param {String} email
 * @param {String} password
 * @returns
 */
const emptyLoginField = (email, password) => {
  let errors = [];
  if (!password) {
    errors.push(TEXT.noPassword);
  }
  if (!email) {
    errors.push(TEXT.noEmail);
  }
  return errors;
};

/**
 * Checks all signup fields
 *
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @returns
 */
const emptySignupField = (name, email, password) => {
  let nameRegex = /^[a-zA-Z\s]+$/;
  let phoneRegex = /^[7-9][0-9]{9}$/;
  let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  let errors = [];
  if (!name || nameRegex.test(name) === false) {
    errors.push(TEXT.noName);
  }
  if (!password) {
    errors.push(TEXT.noPassword);
  }
  if (
    !email ||
    (emailRegex.test(email) === false && phoneRegex.test(email) === false)
  ) {
    errors.push(TEXT.noEmail);
  }
  return errors;
};

module.exports = {
  emptyLoginField,
  emptySignupField,
};
