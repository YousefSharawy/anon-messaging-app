import nodemailer from "nodemailer";
export async function sendEmail(to, subject, html) {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service :"gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"anon-messaging-app" <${process.env.SMTP_USER}>`, // sender address
            to: to, // list of recipients
            subject: subject, // subject line
            html: html, // HTML body
        });
    } catch (err) {
        console.error("Error while sending mail:", err);
    }

}

