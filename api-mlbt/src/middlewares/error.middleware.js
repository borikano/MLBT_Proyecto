function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    ok: false,
    message: error.message || "Error interno del servidor",
    details: process.env.NODE_ENV === "development" ? error.stack : undefined
  });
}

export { errorHandler };
