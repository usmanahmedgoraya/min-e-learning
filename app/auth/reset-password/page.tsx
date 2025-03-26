"use client"

import { ResetPasswordFlow } from "@/components/auth/reset-password/reset-password-flow"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
    const router = useRouter()

    const handleComplete = () => {
        router.push("/auth?tab=login")
    }

    const handleCancel = () => {
        router.push("/auth?tab=login")
    }

    return (
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
            <ResetPasswordFlow onComplete={handleComplete} onCancel={handleCancel} />
        </div>
    )
}

