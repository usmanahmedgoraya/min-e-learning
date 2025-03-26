"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { VerifyAccountForm } from "@/components/auth/verify-account-form"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showVerifyAccount, setShowVerifyAccount] = useState(false)
  const [email, setEmail] = useState("")

  const handleForgotPassword = (email: string) => {
    setEmail(email)
    setShowForgotPassword(true)
  }

  const handleVerifyAccount = (email: string) => {
    setEmail(email)
    setShowVerifyAccount(true)
  }

  const handleBackToLogin = () => {
    setShowForgotPassword(false)
    setShowVerifyAccount(false)
    setActiveTab("login")
  }

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to LearnHub</h1>
          <p className="mt-2 text-muted-foreground">
            {showForgotPassword
              ? "Reset your password"
              : showVerifyAccount
                ? "Verify your account"
                : "Sign in to your account or create a new one"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {showForgotPassword ? (
            <motion.div
              key="forgot-password"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ForgotPasswordForm email={email} onBack={handleBackToLogin} />
            </motion.div>
          ) : showVerifyAccount ? (
            <motion.div
              key="verify-account"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VerifyAccountForm email={email} onBack={handleBackToLogin} />
            </motion.div>
          ) : (
            <motion.div
              key="auth-tabs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm onForgotPassword={handleForgotPassword} />
                </TabsContent>
                <TabsContent value="signup">
                  <SignupForm onVerifyAccount={handleVerifyAccount} />
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

