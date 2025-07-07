"use client"

import { motion } from "framer-motion"
import { AuthForm } from "@/components/auth/auth-form"
import { CenteredLogo } from "@/components/auth/centeredLogo"
import { Heading } from "@/components/auth/heading"
import { BackToHomeLink, SignInLink } from "@/components/auth/navigate-link"
import { Card } from "@/components/ui/card"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <BackToHomeLink />

        <Card className="glass p-8 border-brand-primary/20">
          <CenteredLogo />

          <Heading
            title="Create your account"
            description="Start monitoring your websites in seconds"
          />

          <AuthForm type="signup" />
          <SignInLink />
        </Card>
      </motion.div>
    </div>
  )
}
