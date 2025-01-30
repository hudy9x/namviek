import { mdUserFindEmail, mdUserUpdate } from '@database'
import { sendEmail } from '../../lib/email'
import { hashPassword } from '../../lib/password'
import { sign, verify } from 'jsonwebtoken'
import {
  BaseController,
  Controller,
  Post,
  Body
} from '../../core'

interface ForgotPasswordBody {
  email: string
}

interface ResetPasswordBody {
  token: string
  password: string
}

const ENV = {
  JWT_KEY: process.env.JWT_SECRET_KEY!,
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Namviek',
  FE_GATEWAY: process.env.NEXT_PUBLIC_FE_GATEWAY!,
  RESEND_TOKEN: process.env.RESEND_TOKEN!
} as const

const RESET_PASSWORD_EXPIRY = '15m'

@Controller('/auth')
export default class PasswordController extends BaseController {
  name: string

  constructor() {
    super()
    this.name = 'password'

    // Check for all required environment variables
    if (!ENV.JWT_KEY || !ENV.FE_GATEWAY || !ENV.RESEND_TOKEN) {
      console.error('Forgot password not working. Required environment variables: JWT_SECRET_KEY, NEXT_PUBLIC_FE_GATEWAY, RESEND_TOKEN')
    }
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordBody) {
    try {
      const { email } = body
      console.log('[Forgot Password] Request received for email:', email)

      const user = await mdUserFindEmail(email)
      console.log('[Forgot Password] User found:', !!user)

      if (!user) {
        console.log('[Forgot Password] User not found for email:', email)
        return {
          status: 404,
          message: 'User not found'
        }
      }

      const resetToken = sign(
        { userId: user.id, email: user.email },
        ENV.JWT_KEY,
        { expiresIn: RESET_PASSWORD_EXPIRY }
      )
      console.log('[Forgot Password] Reset token generated for user:', user.id)

      // Save the reset token to user model
      await mdUserUpdate(user.id, {
        resetToken
      })
      console.log('[Forgot Password] Reset token saved to user model')

      const resetUrl = `${ENV.FE_GATEWAY.replace(/\/+$/, '')}/reset-password/${resetToken}`
      console.log('[Forgot Password] Reset URL generated:', resetUrl)

      console.log('[Forgot Password] Attempting to send email to:', email)
      await sendEmail({
        emails: [email],
        subject: `[${ENV.APP_NAME}]: Password Reset Request`,
        html: `
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; border-radius: 5px;">
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: #4a4a4a; text-align: center;">Password Reset Request</h1>
                <p style="font-size: 16px;">Hello ${user.name},</p>
                <p style="font-size: 16px;">We received a request to reset your password. Click the button below to create a new password:</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
                        </td>
                    </tr>
                </table>
                <p style="font-size: 16px;">If the button doesn't work, you can also copy and paste the following link into your browser:</p>
                <p style="font-size: 14px; word-break: break-all; color: #0066cc;">${resetUrl}</p>
                <p style="font-size: 16px;">This link will expire in 15 minutes.</p>
                <p style="font-size: 16px;">If you didn't request this password reset, please ignore this email.</p>
                <p style="font-size: 16px;">Best regards,<br>${ENV.APP_NAME} Team</p>
            </td>
        </tr>
    </table>
    <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">This is an automated message, please do not reply to this email.</p>
</body>
        `
      })
      console.log('[Forgot Password] Email sent successfully to:', email)

      return {
        status: 200,
        message: 'Password reset email sent'
      }

    } catch (error) {
      console.error('[Forgot Password] Error:', error)
      console.error('[Forgot Password] Stack:', error.stack)
      return {
        status: 500,
        message: 'Internal server error'
      }
    }
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordBody) {
    try {
      const { token, password } = body
      console.log('[Reset Password] Request received')

      const decoded = verify(token, ENV.JWT_KEY) as {
        userId: string
        email: string
      }
      console.log('[Reset Password] Token verified for user:', decoded.userId)

      const user = await mdUserFindEmail(decoded.email)
      console.log('[Reset Password] User found:', !!user)

      if (!user || user.resetToken !== token) {
        console.log('[Reset Password] Invalid token or user not found')
        return {
          status: 400,
          message: 'Invalid reset token'
        }
      }

      const hashedPassword = await hashPassword(password)
      console.log('[Reset Password] Password hashed successfully')

      // Update password and clear the reset token
      await mdUserUpdate(user.id, {
        password: hashedPassword,
        resetToken: null
      })
      console.log('[Reset Password] Password updated and reset token cleared for user:', user.id)

      return {
        status: 200,
        message: 'Password has been reset successfully'
      }

    } catch (error) {
      console.error('[Reset Password] Error:', error)
      console.error('[Reset Password] Stack:', error.stack)
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return {
          status: 400,
          message: 'Invalid or expired reset token'
        }
      }
      return {
        status: 500,
        message: 'Internal server error'
      }
    }
  }
} 
