//nodemailer
var nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "885936785776-c2rtvo58lh4nccrun296i5pgfi1v4d50.apps.googleusercontent.com";
const CLIENT_SECRET = "hw_667AvnmHppv1xixGYJh00";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04KN6b_pseGhkCgYIARAAGAQSNwF-L9IrDTkTdMYCIB8qn36-_t6bAN1O6sdw7meaVypeNVuZT9XmO9u1uHXDUt09bMCL3C6eKko";
const SENDER_MAIL = "italimbd@gmail.com";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
  //   process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports.sendMailWithGmail = async (data) => {
  const accessToken = await oAuth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_MAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailData = {
    from: SENDER_MAIL,
    to: data.to,
    subject: data.subject,
    text: data.text,
    //   html: "<h>Thank you for using our App</h>",
  };
  console.log(mailData);

  let info = await transporter.sendMail(mailData);

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return info.messageId;
};

// sendMailWithGmail()
//   .then((result) => console.log("Email sent", result))
//   .catch((error) => console.log(error.message));
