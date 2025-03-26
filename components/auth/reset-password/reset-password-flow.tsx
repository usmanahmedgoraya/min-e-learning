"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EmailStep } from "@/components/auth/reset-password/email-step"
import { OtpVerificationStep } from "@/components/auth/reset-password/otp-verification-step"
import { NewPasswordStep } from "@/components/auth/reset-password/new-password-step"
import { withAuthLayout } from "../with-auth-layout"
import { SuccessStep } from "./success-step"

// Define the possible states of the reset password flow
type ResetPasswordState = "email" | "otp" | "new-password" | "success"

export interface ResetPasswordFlowProps {
  onComplete?: () => void
  onCancel?: () => void
}

function ResetPasswordFlowComponent({ onComplete, onCancel }: ResetPasswordFlowProps) {
  // State to track the current step in the flow
  const [currentStep, setCurrentStep] = useState<ResetPasswordState>("email")

  // State to store data between steps
  const [flowData, setFlowData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  })

  // Handle email submission
  const handleEmailSubmit = async (email: string) => {
    try {
      // Simulate API call to request password reset
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store email and move to OTP step
      setFlowData((prev) => ({ ...prev, email }))
      setCurrentStep("otp")

      return { success: true }
    } catch (error) {
      console.error("Error requesting password reset:", error)
      return { success: false, error: "Failed to send reset code. Please try again." }
    }
  }

  // Handle OTP verification
  const handleOtpVerify = async (otp: string) => {
    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store OTP and move to new password step
      setFlowData((prev) => ({ ...prev, otp }))
      setCurrentStep("new-password")

      return { success: true }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      return { success: false, error: "Invalid verification code. Please try again." }
    }
  }

  // Handle new password submission
  const handlePasswordSubmit = async (password: string) => {
    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store new password and move to success step
      setFlowData((prev) => ({ ...prev, newPassword: password }))
      setCurrentStep("success")

      return { success: true }
    } catch (error) {
      console.error("Error resetting password:", error)
      return { success: false, error: "Failed to reset password. Please try again." }
    }
  }

  // Handle completion of the flow
  const handleComplete = () => {
    if (onComplete) {
      onComplete()
    }
  }

  // Animation variants for transitions
  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {currentStep === "email" && (
          <motion.div
            key="email-step"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <EmailStep onSubmit={handleEmailSubmit} onCancel={onCancel} />
          </motion.div>
        )}

        {currentStep === "otp" && (
          <motion.div
            key="otp-step"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <OtpVerificationStep
              email={flowData.email}
              onVerify={handleOtpVerify}
              onBack={() => setCurrentStep("email")}
            />
          </motion.div>
        )}

        {currentStep === "new-password" && (
          <motion.div
            key="new-password-step"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <NewPasswordStep onSubmit={handlePasswordSubmit} onBack={() => setCurrentStep("otp")} />
          </motion.div>
        )}

        {currentStep === "success" && (
          <motion.div
            key="success-step"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <SuccessStep onComplete={handleComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Export the component wrapped with the auth layout HOC
export const ResetPasswordFlow = withAuthLayout(ResetPasswordFlowComponent, {
  title: "Reset Your Password",
  description: "Follow the steps to reset your password and regain access to your account.",
})

