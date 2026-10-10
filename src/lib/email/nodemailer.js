// import nodemailer from "nodemailer";
// import { env } from "../config/env.js";
// export async function sendEmail(to, subject, html) {
//     Create a transporter using SMTP
//     const transporter = nodemailer.createTransport({
//         service :"gmail",
//         auth: {
//             user: env.nodemailer.user,
//             pass: env.nodemailer.password,
//         },
//     });

//     try {
//         const info = await transporter.sendMail({
//             from: `"anon-messaging-app" <${env.nodemailer.SMTP_USER}>`, // sender address
//             to: to, // list of recipients
//             subject: subject, // subject line
//             html: html, // HTML body
//         });
//     } catch (err) {
//         console.error("Error while sending mail:", err);
//     }

// }

