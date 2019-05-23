import * as express from "express";

// TODO: Get key from the database
const goodKey: string = "123";

module.exports = (
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
  var receivedKey = req.headers["token"];

  if (receivedKey != goodKey) {
    res.status(401);
    res.send("<center><h1>401</h1><p>Invalid API key!</p></center>");
    return;
  }
  next();
};
