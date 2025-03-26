"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Form validation schema
const formSchema = z.object({
  digit1: z.string().length(1, { message: "Required" }),
  digit2: z.string().length(1, { message: "Required" }),
  digit3: z.string().length(1, { message: "Required" }),
  digit4: z.string().length(1, { message: "Required" }),
  digit5: z.string().length(1, { message: "Required" }),
  digit6: z.string().length(1, { message: "Required" }),
})

type FormValues = z.infer<typeof formSchema>

interface OtpVerificationStepProps {
  email: string
  onVerify: (otp: string) => Promise<{ success: boolean; error?: string }>
  onBack: () => void
}

export function OtpVerificationStep({ email, onVerify, onBack }: OtpVerificationStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
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
  const handleDigitChange = (index: number, value: string) => {
    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus()
    }
  }

  // Handle backspace to go back
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && form.getValues()[`digit${index + 1}` as keyof FormValues] === "") {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      // Combine OTP digits
      const otp = Object.values(values).join("")

      const result = await onVerify(otp)

      if (!result.success && result.error) {
        setError(result.error)
      }
    } catch (err) {
      console.error(err);
      
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setResendDisabled(true)
    setCountdown(60)

    // Simulate API call to resend code
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    form.reset()
    inputRefs[0].current?.focus()
  }

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mb-2 -ml-2 flex items-center text-muted-foreground"
        onClick={onBack}
        disabled={isLoading}
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back
      </Button>

      <div className="space-y-2 text-left">
        <h3 className="text-lg font-medium">Verify your identity</h3>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a 6-digit verification code to <span className="font-medium">{email}</span>
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <FormField
                key={num}
                control={form.control}
                name={`digit${num}` as keyof FormValues}
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
                          handleDigitChange(index, value)
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
                <>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Verify code
                </>
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
    </div>
  )
}

