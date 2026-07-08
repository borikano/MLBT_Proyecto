function asyncHandler(controller) {
  return function wrappedController(req, res, next) {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
}

export { asyncHandler };
