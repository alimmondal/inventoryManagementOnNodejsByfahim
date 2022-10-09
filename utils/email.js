//nodemailer
var nodemailer = require("nodemailer");
const { google } = require("googleapis");

// const CLIENT_ID =
//   "885936785776-66grcqpj8q4gvpluvkm5o43lj4vd73sa.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//04KN6b_pseGhkCgYIARAAGAQSNwF-L9IrDTkTdMYCIB8qn36-_t6bAN1O6sdw7meaVypeNVuZT9XmO9u1uHXDUt09bMCL3C6eKko";

const oAuth2Client = new google.auth.oAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refreshToken: process.env.REFRESH_TOKEN });

module.exports.sendMailWithGmail = async (data) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "italimbd@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "ITALIM <italimbd@gmail.com>",
      to: "abbeauty@gmail.com",
      subject: "Hello from gmail email using API",
      text: "Thank you for using our App",
      html: "<h>Thank you for using our App</h>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

sendMail()
  .then((result) => console.log("Email sent", result))
  .catch((error) => console.log(error.message));

module.exports = sendMail;
