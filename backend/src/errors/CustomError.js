/* src/errors/CustomError.js */
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    // this.code = code;
  }
}

module.exports = CustomError;