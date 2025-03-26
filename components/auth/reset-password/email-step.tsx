"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormValues = z.infer<typeof formSchema>

interface EmailStepProps {
  onSubmit: (email: string) => Promise<{ success: boolean; error?: string }>
  onCancel?: () => void
}

export function EmailStep({ onSubmit, onCancel }: EmailStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await onSubmit(values.email)

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

  return (
    <div className="space-y-4">
      {onCancel && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mb-2 -ml-2 flex items-center text-muted-foreground"
          onClick={onCancel}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to login
        </Button>
      )}

      <div className="space-y-2 text-left">
        <h3 className="text-lg font-medium">Forgot your password?</h3>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a verification code to reset your password.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending verification code...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send verification code
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

