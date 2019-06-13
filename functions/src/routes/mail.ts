import * as express from "express";
import MailService from "../services/mail/mail-service";
import CredentialService from "../services/database/credential-service";

/* Ping Router */
const router = express.Router();

/* Implement endpoints */
router.post("", async (req, res) => {
  console.log("SENDING MAIL");
  const destMail = req.header("x-email");

  // Check for mail adres in the header
  if (!destMail) {
    console.log("No destination mail found!");
    return res.send(false);
  }
  const service = new CredentialService();
  const credentials = await service.get("km.corporatienl@gmail.com");

  if (String(destMail).endsWith(credentials.emailDomain)) {
    // TODO Send mail
    const mailService = new MailService();
    try {
      await mailService.SendMail(String(destMail));
    } catch (error) {
      console.log(error);
      return res.send(false);
    }

    return res.send(true);
  } else {
    console.log("Wrong e-mail domain!");
    return res.send(false);
  }
});

module.exports = router;
