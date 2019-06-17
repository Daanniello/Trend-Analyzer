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
    return res.sendStatus(401);
  }

  const stringMail = String(destMail);

  if (!stringMail.endsWith(process.env.EMAIL_DOMAIN as string)) {
    return res.sendStatus(401);
  }

  try {
    const mailService = new MailService();
    await mailService.SendMail(stringMail);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  // if (String(destMail).endsWith(process.env.EMAIL_DOMAIN as string)) {
  // } else {
  //   return res.sendStatus(401);
  // }
});

module.exports = router;
