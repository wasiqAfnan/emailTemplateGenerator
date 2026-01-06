import { log } from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  log("info", "Incoming request", {
    method: req.method,
    path: req.originalUrl,
    body: req.body,
  });

  next();
};
