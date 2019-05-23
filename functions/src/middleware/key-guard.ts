import * as express from "express";
import CredentialService from "../services/database/credential-service";

module.exports = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // Checks if the key send in the request is the same as the one in the database.
  // If no valid API key has been sent, send an error message and return.

  if (req.path.indexOf("/login") === 0) {
    return next();
  }

  // Alternative ways to get token(key): var token = req.body.token;
  const receivedKey = req.headers["x-api-key"];
  const service = new CredentialService();
  const creds = await service.get("km.corporatienl@gmail.com");

  if (receivedKey != creds.apiKey) {
    res.send(401);
    return;
  }
  next();
};
