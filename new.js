const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 5500;

app.use(bodyParser.json());

// Replace with your email and password
const senderEmail = "202201202@vupune.ac.in";
const senderPassword = "12345678";

const fixedRecipientEmail = "parth200427@gmail.com"; // Fixed recipient email address

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/new.html");
});

app.post("/send-email", (req, res) => {
  // Use the fixed recipient email address
  const recipientEmail = fixedRecipientEmail;

  const mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: "Your One-Time Password (OTP) for Login",

    text: "Hello,Thank you for using the Vishwakarma University Login Portal.Your one time password (OTP) is 123456.Please use this OTP to complete the login process.Do not share this OTP with anyone for security reasons.If you did not attempt to log in your email is being used without your knowledge contact the admin as soon as possible ",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.json({ success: false, message: "Error sending email." });
    } else {
      console.log("Email sent:", info.response);
      res.json({ success: true, message: "Email sent successfully." });
    }
  });
});

// Serve static files from the same directory (including  and new.html)
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log("Server is running at http://localhost:${port}");
});