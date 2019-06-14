const nodemailer = require("nodemailer");
import CredentialService from "../../services/database/credential-service";

class MailService {
  async SendMail(dest: string) {
    const service = new CredentialService();
    const credentials = await service.get(process.env.EMAIL_CLIENT as string);

    console.log("MailService mail: " + dest);
    /**
     * Send an email with gmail (can currently only be changed in code)
     */
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_CLIENT,
        pass: process.env.EMAIL_PASSWORD as string
      }
    });

    let mailOptions = {
      from: "Trend Analyzer <" + process.env.EMAIL_CLIENT + ">",
      to: dest,
      subject: "Pincode Trend Analyzer",
      html:
        "<p>The pincode for the trend analyzer is: <b>" +
        credentials.pincode +
        "</b></p>"
    };

    transporter.sendMail(mailOptions, (erro: any, info: any) => {
      if (erro) {
        console.log("Error: " + erro);
        return false;
      }
      console.log("No error!");
      return true;
    });
  }
}

export default MailService;
