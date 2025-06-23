console.log("=== sendMail.js loaded ===");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS

    }
});

async function sendEmail(to,sub,text){
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to :to,
        subject: sub,
        text: text
    });
    console.log(process.env.EMAIL_USER, " " + process.env.EMAIL_PASS);
}

module.exports = sendEmail;