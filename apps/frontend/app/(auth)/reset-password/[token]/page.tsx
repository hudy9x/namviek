import ResetPasswordForm from './ResetPasswordForm'

export default function ResetPasswordPage({
  params
}: {
  params: { token: string }
}) {
  return <ResetPasswordForm token={params.token} />
} 