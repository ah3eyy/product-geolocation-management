import config from "../config/index";
import nodemailer from "nodemailer";

const emailHelper = async (email, body) => {

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: config.mail.user,
            pass: config.mail.password
        }
    });

    await transport.sendMail({
        from: '"TradePot 👻" <foo@example.com>', // sender address
        to: email,
        subject: "Hello ✔, Tradepot Comment Notification",
        text: body,
        html: body,
    });
}

export default emailHelper;
