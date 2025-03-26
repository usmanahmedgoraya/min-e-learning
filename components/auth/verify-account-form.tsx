"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { verifyEmailAction } from "@/app/actions/auth.action"
import { toast } from "sonner"
import { useAuth } from "../with-auth"

const formSchema = z.object({
  pin1: z.string().length(1, { message: "Required" }),
  pin2: z.string().length(1, { message: "Required" }),
  pin3: z.string().length(1, { message: "Required" }),
  pin4: z.string().length(1, { message: "Required" })
})

export type FormValues = z.infer<typeof formSchema>

export interface VerifyAccountFormProps {
  email: string
  onBack: () => void
}

export function VerifyAccountForm({ email, onBack }: VerifyAccountFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(80);
  const { clearRedirectPath, getRedirectPath } = useAuth()

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ]

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: ""
    },
  })

  // Handle countdown for resend button
  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setResendDisabled(false)
    }
  }, [resendDisabled, countdown])

  // Handle input focus and auto-advance
  const handlePinChange = (index: number, value: string) => {
    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus()
    }
  }

  // Handle backspace to go back
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && form.getValues()[`pin${index + 1}` as keyof FormValues] === "") {
      inputRefs[index - 1].current?.focus()
    }
  }

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)
    const redirectURL = getRedirectPath()
    // Combine PIN values
    const pin = Object.values(values).join("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const result = await verifyEmailAction({ email, otp: pin })
    // If there is any error, handle this
    if (result.error) {
      toast.error(result.error || "An Error Occurred while requesting")
      return;
    }
    console.log({ email, pin })
    setIsLoading(false)
    setIsVerified(true)
    setIsLoading(false)
    if (redirectURL.length > 0) {
      clearRedirectPath()
      return router.push(redirectURL)
    }
    // Redirect to home page after successful verification
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  const handleResendCode = async () => {
    setResendDisabled(true)
    setCountdown(60)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Resending verification code to", email)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mb-2 -ml-2 flex items-center text-muted-foreground"
        onClick={onBack}
        disabled={isLoading || isVerified}
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to login
      </Button>

      {isVerified ? (
        <Alert className="border-green-500/50 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Account verified successfully!</AlertTitle>
          <AlertDescription>Your account has been verified. You will be redirected to the homepage.</AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 text-left">
              <h3 className="text-lg font-medium">Verify your account</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;ve sent a 4-digit verification code to <span className="font-medium">{email}</span>
              </p>
            </div>

            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4].map((num, index) => (
                <FormField
                  key={num}
                  control={form.control}
                  name={`pin${num}` as keyof FormValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          ref={inputRefs[index]}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          className="h-12 w-12 text-center text-lg"
                          onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/[^0-9]/g, "")
                            field.onChange(value)
                            handlePinChange(index, value)
                          }}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          autoFocus={index === 0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify account"
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Didn&apos;t receive a code? </span>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm"
                  onClick={handleResendCode}
                  disabled={resendDisabled}
                >
                  {resendDisabled ? `Resend in ${countdown}s` : "Resend code"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </motion.div>
  )
}

