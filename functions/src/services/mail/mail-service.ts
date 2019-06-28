import * as nodemailer from "nodemailer";
import CredentialService from "../../services/database/credential-service";

class MailService {
  async SendMail(dest: string) {
    const service = new CredentialService();
    const credentials = await service.get(process.env.EMAIL_USER as string);

    console.log("MailService mail: " + dest);
    /**
     * Send an email with gmail (host is gmail, change gmail to other host if needed)
     */
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let mailOptions = {
      from: "Trend Analyzer <" + process.env.EMAIL_USER + ">",
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
