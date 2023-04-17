//nodemailer
var nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "109367044159-q1d62v7nqrq8qukulctkfm4m8n0kh3mq.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04JdhhV9iVpXfCgYIARAAGAQSNwF-L9Irt58f-i9tGoCeNgEkBh6QfcriA1lLCR9YlR6tSPw8q8bYWb8auSijwPCKiq8FA79qok8";
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
