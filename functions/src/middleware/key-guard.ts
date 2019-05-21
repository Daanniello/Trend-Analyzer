import * as express from "express";

/* Implement middleware */
module.exports = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // TODO: Check if api-key is correct
  next();
};
