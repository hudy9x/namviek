import Link from 'next/link'

export default function Verification() {
  return (
    <div>
      <p>Congratulations! Your Account is Now Active.</p>
      <Link href="http://localhost:4200/sign-in">Back to Login</Link>
    </div>
  )
}
