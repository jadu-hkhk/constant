import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function SignInLink() {
  return (
    <p className="text-center text-gray-400 mt-6">
      Already have an account?{" "}
      <Link
        href="/signin"
        className="text-brand-primary hover:text-brand-secondary transition-colors"
      >
        Sign In
      </Link>
    </p>
  )
}

export function BackToHomeLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center text-gray-400 hover:text-brand-primary transition-colors duration-200 mb-8"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Home
    </Link>
  )
}

export function SignUpLink() {
  return (
    <p className="text-center text-gray-400 mt-6">
      Don&apos;t have an account?{" "}
      <Link
        href="/signup"
        className="text-brand-primary hover:text-brand-secondary transition-colors"
      >
        Sign Up
      </Link>
    </p>
  )
}
