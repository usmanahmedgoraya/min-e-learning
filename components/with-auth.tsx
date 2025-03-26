"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Lock } from "lucide-react"
import { type ComponentType, useState } from "react"

// Mock authentication state
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Simulate login
  const login = () => {
    setIsAuthenticated(true)
    return Promise.resolve(true)
  }

  // Simulate logout
  const logout = () => {
    setIsAuthenticated(false)
    return Promise.resolve(true)
  }

  return { isAuthenticated, login, logout }
}

// HOC for protected components
export function withAuth<P extends object>(Component: ComponentType<P>) {
  function WithAuthComponent(props: P) {
    const [showAuthDialog, setShowAuthDialog] = useState(false)
    const { isAuthenticated, login } = useAuth()

    // If authenticated, render the component
    if (isAuthenticated) {
      return <Component {...props} />
    }

    // Handle login
    const handleLogin = async () => {
      await login()
      setShowAuthDialog(false)
    }

    // Handle dialog close
    const handleClose = () => {
      setShowAuthDialog(false)
    }

    // Render a button that opens the auth dialog
    return (
      <>
        <Button onClick={() => setShowAuthDialog(true)} className="w-full">
          <Lock className="mr-2 h-4 w-4" />
          Login to Enroll
        </Button>

        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Authentication Required</DialogTitle>
              <DialogDescription>You need to be logged in to enroll in this course.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                This is a demo authentication dialog. In a real application, you would have a proper login form here.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleLogin}>Login</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // Set display name for better debugging
  const displayName = Component.displayName || Component.name || "Component"
  WithAuthComponent.displayName = `withAuth(${displayName})`

  return WithAuthComponent
}

// Protected Enroll Button component
function EnrollButton({ price }: { courseId: number; price: number }) {
  return <Button className="w-full">Enroll Now for ${price.toFixed(2)}</Button>
}

// Export the protected component
export const ProtectedEnrollButton = withAuth(EnrollButton)

