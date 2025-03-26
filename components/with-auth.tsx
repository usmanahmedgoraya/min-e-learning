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
import Cookies from 'js-cookie'
import { Lock } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { type ComponentType, useEffect, useState } from "react"

// Mock authentication state
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for auth-token cookie
        console.log('All cookies:', document.cookie);
        const cookieValue = Cookies.get('auth-token');
        console.log('auth-token cookie:', cookieValue);
        setIsAuthenticated(!!cookieValue);
        
        setIsAuthenticated(!!cookieValue)
      } catch (error) {
        console.error("Error checking auth token:", error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  // Simulate login
  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
    return Promise.resolve(true)
  }

  // Simulate logout
  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
    return Promise.resolve(true)
  }

  // Store redirect path
  const setRedirectPath = () => {
    localStorage.setItem('redirectPath', pathname)
  }

  // Get redirect path
  const getRedirectPath = () => {
    return localStorage.getItem('redirectPath') || '/'
  }

  // Clear redirect path
  const clearRedirectPath = () => {
    localStorage.removeItem('redirectPath')
  }

  return {
    isAuthenticated,
    login,
    logout,
    setRedirectPath,
    getRedirectPath,
    clearRedirectPath
  }
}

// HOC for protected components
export function withAuth<P extends object>(Component: ComponentType<P>) {
  function WithAuthComponent(props: P) {
    const [showAuthDialog, setShowAuthDialog] = useState(false)
    const {
      isAuthenticated,
      login,
      setRedirectPath,
      getRedirectPath,
      clearRedirectPath
    } = useAuth()

    const router = useRouter()

    // If authenticated, render the component
    if (isAuthenticated) {
      return <Component {...props} />
    }

    // Handle login button click
    const handleAuthButtonClick = () => {
      // setRedirectPath()
      if(isAuthenticated) 
      setRedirectPath()
      router.push('/auth?tab=login')
      // setShowAuthDialog(true)
    }

    // Handle login
    const handleLogin = async () => {
      await login()
      setShowAuthDialog(false)
      const redirectPath = getRedirectPath()
      clearRedirectPath()
      window.location.href = redirectPath
    }

    // Handle dialog close
    const handleClose = () => {
      setShowAuthDialog(false)
    }

    // Render a button that opens the auth dialog
    return (
      <>
        <div className="w-full cursor-pointer" onClick={handleAuthButtonClick}>
          <Button className="w-full">
            <Lock className="mr-2 h-4 w-4" />
            Login to Enroll
          </Button>
        </div>

        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Authentication Required</DialogTitle>
              <DialogDescription>
                You need to be logged in to enroll in this course.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                You will be redirected to the login page. After successful login,
                you&apos;ll return to this page to complete your enrollment.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Link href="/auth" passHref>
                <Button onClick={handleLogin}>Go to Login</Button>
              </Link>
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
function EnrollButton({ price }: { price: number }) {
  return <Button className="w-full">Enroll Now for ${price}</Button>
}

// Export the protected component
export const ProtectedEnrollButton = withAuth(EnrollButton)