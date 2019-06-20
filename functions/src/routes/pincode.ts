import * as express from "express";
import CredentialService from "../services/database/credential-service";
import ICredential from "../models/credential-model";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", async (req, res) => {
  console.log("SENDING NEW PINCODE");
  const newPincode = String(req.header("x-new-pincode"));
  console.log("New pincode: " + newPincode);
  // Get the credentials and check if the pincode is correct, if it's a valid new pincode update the database and send it to the frontend
  const service = new CredentialService();
  const credentials = await service.get("km.corporatienl@gmail.com");

  if (parseInt(newPincode) > 999 && parseInt(newPincode) < 10000) {
    if (credentials.pincode != newPincode) {
      const cred: ICredential = {
        email: credentials.email,
        apiKey: credentials.apiKey,
        pincode: newPincode
      };
      try {
        service.set("km.corporatienl@gmail.com", cred);
        return res.send(newPincode);
      } catch (error) {
        return res.sendStatus(500);
      }
    }
  }
  return res.sendStatus(500);
});

module.exports = router;
