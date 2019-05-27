import * as express from "express";
import CredentialService from "../services/database/credential-service";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", async (req, res) => {
  const pincode = req.header("x-pincode");

  if (!pincode) return res.send(400);

  const service = new CredentialService();
  const credentials = await service.get("km.corporatienl@gmail.com");

  if (pincode !== credentials.pincode) return res.send(401);

  return res.send({ apiKey: credentials.apiKey });
});

module.exports = router;
