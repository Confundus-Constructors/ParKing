const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

exports.sendVerificationCode = functions.https.onCall(async (data, context) => {
  const userEmail = data.email;

  // Generate random verification code
  // eslint-disable-next-line max-len
  const code = Math.floor(100000 + Math.random() * 900000); // generates a 6-digit number

  // Save the code in Firestore with a timestamp
  await admin.firestore().collection("verificationCodes").add({
    email: userEmail,
    code: code,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Send email with the code
  await transporter.sendMail({
    from: "your-email@gmail.com",
    to: userEmail,
    subject: "Your Verification Code",
    text: "Your verification code is: " + code,
  });

  return {success: true};
});
