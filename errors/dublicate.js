const { DUPLICATE_ERROR } = require('../constants/errors');

class DublicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE_ERROR;
  }
}

module.exports = DublicateError;
