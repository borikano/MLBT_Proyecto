class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

function createHttpError(statusCode, message) {
  return new HttpError(statusCode, message);
}

export { HttpError, createHttpError };
