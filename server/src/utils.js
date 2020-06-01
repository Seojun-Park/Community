import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * 1000000).toString();
  return randomNumber;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };

  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "Jinstagram@jinsta.com",
    to: address,
    subject: "Login Secret Number 🐴",
    html: `Hello! Your secret number is <h2>${secret}</h2><br/>Copy paste the number on app to log in.`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

export const confirmApply = user => {
  console.log("confirm this guy??");
  console.log(user);
  return "notAccept";
};
