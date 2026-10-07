export function otpTemplate(otp) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f6f7fb; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f7fb; padding:32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" style="max-width:440px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">
                    <tr>
                        <td align="center" style="padding:40px 32px 8px 32px;">
                            <div style="width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#6d5ef5,#9b5ef5); margin:0 auto 16px auto;"></div>
                            <h1 style="margin:0 0 8px 0; font-size:24px; color:#1a1d2e; font-weight:700;">Verify your email</h1>
                            <p style="margin:0; font-size:14px; color:#6b7280; line-height:1.6;">Use the code below to complete your sign up. It expires in <strong>5 minutes</strong>.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:28px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" style="letter-spacing:14px;">
                                <tr>
                                    ${otp.split('').map((digit, i) => `
                                    <td align="center" style="width:44px; height:56px; background:#f2f3fa; border-radius:10px; border:1px solid #e5e7ef; margin:0 4px;">
                                        <span style="display:inline-block; font-size:30px; font-weight:800; color:#1a1d2e; line-height:56px;">${digit}</span>
                                    </td>`).join('  <td style="width:4px;"></td>  ')}
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:0 32px 28px 32px;">
                            <div style="background:#f7f4ff; border-radius:10px; padding:14px 16px;">
                                <p style="margin:0; font-size:13px; color:#6b7280;">Not expecting this email?</p>
                                <p style="margin:6px 0 0 0; font-size:13px; color:#6d5ef5; font-weight:600;">You can safely ignore it.</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:16px 32px 32px 32px;">
                            <p style="margin:0; font-size:12px; color:#9ca3af;">© ${new Date().getFullYear()} anon-messaging-app<br>Get anonymous messages, share anytime.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}