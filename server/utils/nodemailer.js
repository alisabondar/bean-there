const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "REDACTED",
    pass: "REDACTED",
  }
}

const transporter = nodemailer.createTransport(config);

const sendOTPVerificationEmail = async (email) => {

  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      to: email,
      subject: "Bean There OTP",
      html: `<code>Your OTP is: <b>${otp}</b>, please enter where prompted</code>`,
    }

    await transporter.sendMail(mailOptions);

    return otp;
  } catch (error) {
    throw new Error("unable to send otp")
  }
}


module.exports = sendOTPVerificationEmail;
