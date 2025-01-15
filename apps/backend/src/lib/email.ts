import { Resend } from 'resend'
let resend: Resend;
let ready = false
try {
  resend = new Resend(process.env.RESEND_TOKEN)
  ready = true
} catch (error) {
  console.warn("Resend token is missing")
}

const resendFromEmail = `${process.env.RESEND_EMAIL_DOMAIN || 'noreply@resend.dev'}` // noreply@domain.com
const resendFromEmailName = `${process.env.RESEND_EMAIL_NAME || 'Noreply'}`
const appName = `${process.env.NEXT_PUBLIC_APP_NAME || 'Namviek'}`

interface IEmailFields {
  subject: string
  text?: string
  html?: string
  emails: string[]
}

const _cannotSendEmail = () => {
  if (!ready) {
    console.warn('Cannot send this email. Resend token is missing')
    return true
  }

  return false
}


export const sendEmail = ({ emails, html, subject }: IEmailFields) => {
  if (_cannotSendEmail()) return
  return resend.emails.send({
    from: `${resendFromEmailName} <${resendFromEmail}>`,
    to: emails,
    subject,
    html
    // attachments: [
    //   {
    //     filename: 'invoice.pdf',
    //     content: invoiceBuffer
    //   }
    // ],
    // headers: {
    //   'X-Entity-Ref-ID': '123456789'
    // },
    // tags: [
    //   {
    //     name: 'category',
    //     value: 'confirm_email'
    //   }
    // ]
  })
}

export const sendVerifyEmail = ({
  userName,
  email,
  token
}: {
  userName: string
  email: string
  token: string
}) => {
  if (_cannotSendEmail()) return

  const verificationLink = `${process.env.NEXT_PUBLIC_FE_GATEWAY}email-verification?token=${token}`
  return sendEmail({
    emails: [email],
    subject: `[${appName}]: Please Verify Your Email Address`,
    html: `
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; border-radius: 5px;">
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: #4a4a4a; text-align: center;">Email Verification</h1>
                <p style="font-size: 16px;">Hello <strong>${userName}</strong>,</p>
                <p style="font-size: 16px;">Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verify Email</a>
                        </td>
                    </tr>
                </table>
                <p style="font-size: 16px;">If the button doesn't work, you can also copy and paste the following link into your browser:</p>
                <p style="font-size: 14px; word-break: break-all; color: #0066cc;">${verificationLink}</p>
                <p style="font-size: 16px;">If you didn't create an account, please ignore this email.</p>
                <p style="font-size: 16px;">Best regards,<br>${appName} Team</p>
            </td>
        </tr>
    </table>
    <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">This is an automated message, please do not reply to this email.</p>
</body>
`
  })
}
