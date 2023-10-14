"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'djkmecdgm65@gmail.com',
      pass: 'ngxfnzgudmaoxkoh'
    }
});

transporter.verify().then(() => {
    console.log("email verificado")
})

module.exports = transporter