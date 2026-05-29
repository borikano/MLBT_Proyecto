function validate(schema) {
  return function validateRequest(req, res, next) {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos de entrada invalidos",
        errors: result.error.flatten()
      });
    }

    req.validated = result.data;
    return next();
  };
}

export { validate };
