"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SuccessStepProps {
  onComplete: () => void
}

export function SuccessStep({ onComplete }: SuccessStepProps) {
  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle>Password reset successful!</AlertTitle>
        <AlertDescription>
          Your password has been reset successfully. You can now log in with your new password.
        </AlertDescription>
      </Alert>

      <div className="text-center">
        <p className="mb-4 text-muted-foreground">
          You will be redirected to the login page in a few seconds, or you can click the button below.
        </p>
        <Button onClick={onComplete} className="w-full">
          Go to login
        </Button>
      </div>
    </div>
  )
}

