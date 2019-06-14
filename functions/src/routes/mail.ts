import * as express from "express";
import MailService from "../services/mail/mail-service";

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

  if (String(destMail).endsWith(process.env.EMAIL_DOMAIN as string)) {
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
