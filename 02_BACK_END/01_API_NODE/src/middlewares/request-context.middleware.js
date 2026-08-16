import { randomUUID } from "node:crypto";

function requestContext(req, res, next) {
  const requestId = randomUUID();

  req.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);
  next();
}

export { requestContext };
