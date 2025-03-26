"use client"

import type { ComponentType } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthLayoutProps {
  title: string
  description: string
  showBackButton?: boolean
  onBack?: () => void
}

// Higher Order Component for auth related pages
export function withAuthLayout<P extends object>(Component: ComponentType<P>, layoutProps: AuthLayoutProps) {
  const WithAuthLayout = (props: P & { onCancel?: () => void }) => {
    const { title, description, showBackButton = false } = layoutProps

    return (
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>

        {showBackButton && props.onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2 flex items-center text-muted-foreground"
            onClick={props.onCancel}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        )}

        <Component {...props} />
      </div>
    )
  }

  WithAuthLayout.displayName = `withAuthLayout(${Component.displayName || Component.name || "Component"})`

  return WithAuthLayout
}

