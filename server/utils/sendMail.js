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
}

module.exports = sendEmail;