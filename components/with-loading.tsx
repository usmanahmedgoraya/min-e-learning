"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

// Define a custom hook instead of an HOC
export function useLoading(delay = 500) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return { isLoading, setLoading: setIsLoading }
}

// Loading component
export function LoadingSpinner() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

