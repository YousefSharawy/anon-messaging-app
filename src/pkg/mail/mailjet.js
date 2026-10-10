import Mailjet from "node-mailjet";
export class MailjetProvider {
    client;
    constructor(config) {
        this.client = new Mailjet({
            apiKey: config.apiKey,
            apiSecret: config.apiSecret
        });
        this.fromName = config.fromName;
        this.fromEmail = config.fromEmail;
    };

    sendEmail(email, subject, html) {
        return this.client.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: this.fromEmail,
                        Name: this.fromName,
                    },
                    To: [
                        {
                            Email: email,
                        },
                    ],
                    Subject: subject,
                    HTMLPart: html,
                },
            ],
        });
    }


}
