import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // Set to false for TLS
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASS
  },
  tls: {
    rejectUnauthorized: false // This disables the self-signed certificate check
  }
});

export default transporter;


