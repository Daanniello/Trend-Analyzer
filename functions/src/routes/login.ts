import * as express from "express";
import CredentialService from "../services/database/credential-service";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", async (req, res) => {
  console.log("LOGGING IN");
  const pincode = req.header("x-pincode");

  // Check for a pincode in the header
  if (!pincode) return res.sendStatus(400);

  // Get the credentials and check if the pincode is correct
  const service = new CredentialService();
  const credentials = await service.get("km.corporatienl@gmail.com");

  if (pincode !== credentials.pincode) return res.sendStatus(401);

  return res.send({ apiKey: credentials.apiKey });
});

module.exports = router;
