var dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.EMAIL_TEST,
    pass: process.env.EMAIL_TEST_APP_PSWD,
  },
});

export async function verifyEmail(firstName, lastName, userEmail, token) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_TEST,
      to: userEmail,
      subject: "Welcome to Post-It,  Email verification",
      test: `Hello ${firstName} ${lastName}, Please verify your Email.`,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function passwordChange(userEmail, token) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_TEST,
      to: userEmail,
      subject: "Security Alert",
      test: `Login to Verify that you are the one`,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
}
