import * as express from "express";
import CredentialService from "../services/database/credential-service";

/**
 * Checks if the key send in the request is the same as the one in the database.
 * If login page proceed.
 * If the api key in the header is the same as the one in the database proceed.
 * If no valid API key has been sent, send an error message and return.
 */
module.exports = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.path.indexOf("/login") === 0) {
    return next();
  }

  const receivedKey = req.headers["x-api-key"];
  const service = new CredentialService();
  const creds = await service.get("km.corporatienl@gmail.com");

  if (receivedKey != creds.apiKey) {
    res.sendStatus(401);
    return;
  }
  next();
};
