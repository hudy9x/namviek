import { Resend } from 'resend'
let resend: Resend;
let ready = false
try {
  resend = new Resend(process.env.RESEND_TOKEN)
  ready = true
} catch (error) {
  console.warn("Resend token is missing")
}

const supportEmail = 'support.dev'
const productionAddress = 'Kampuni.dev'

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
    from: `Noreply <noreply@${process.env.RESEND_EMAIL_DOMAIN}>`,
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
    subject: '[Kampuni] Invitation email for joining organization',
    html: `

    <p>Dear <strong>${userName}</strong>,</p>

    <p>Thank you for signing up with <strong>Kampuni</strong>! We're thrilled to have you as part of our community.</p>
  
    <p>To complete your registration and ensure the security of your account, we need to verify your email address. Verifying your email will allow you to enjoy all the benefits and features of our platform.</p>
  
    <p>Please follow these simple steps to verify your email:</p>
  
    <ol>
      <li>Click on the verification link below (or copy and paste it into your web browser):<br>
        <a href=${verificationLink}>Verify Your Email</a></li>
  
      <li>Once the link is opened, you'll be redirected to our website, and your email will be automatically verified.</li>
    </ol>
  
    <p>Please note that this verification link is only valid for the next 24 hours. If you don't verify your email within this time frame, you may need to request a new verification email.</p>
  
    <p>If you didn't create an account with us or believe this email was sent to you in error, please disregard it.</p>
  
    <p>If you encounter any issues during the verification process, or if you have any questions about your account, please don't hesitate to contact our support team at <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
  
    <p>We're excited to have you on board, and we can't wait to provide you with a fantastic experience!</p>
  
    <p>Best regards,<br>
      Kampuni<br>
      <a href=${productionAddress}>${productionAddress}</a>
    </p>
`
  })
}
