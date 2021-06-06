const ERRORS = {
  noPasswordMatch: "Password doesn't match!!!",
  noUser: "User doesn't Exist!!",
  notAdmin: "Access Denied!!! You aren't admin, please login as a user",
  noUserExists: 'No such user id exist',
  someFieldsMissing: 'Something is missing out of required fields',
  noEmail: 'There is no email to add',
  noPassword: 'There is no password to add',
  noName: 'No name to add',
  noUserId: 'No user id',
  noBlogId: 'No Blog Id',
  noBlogTitle: 'No blog title to search',
  dbError: 'Something wrong with the query or Database',
  permissionDenied:
    "Permission Denied!!! You don't have rights for this operation.",
};

module.exports = { ERRORS };
