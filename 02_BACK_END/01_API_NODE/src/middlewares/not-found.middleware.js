function notFoundHandler(req, res, next) {
  res.status(404).json({
    ok: false,
    message: "Ruta no encontrada",
    path: req.originalUrl
  });
}

export { notFoundHandler };
