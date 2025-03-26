import { formSchema } from "@/components/auth/signup-form"
import { z } from "zod"

export type FormValues = z.infer<typeof formSchema>

export interface SignupFormProps {
    onVerifyAccount: (email: string) => void
}

export type VerifyEmailFormData = {
    email: string;
    otp: string;
};

export type ActionResponse = {
    success?: string;
    error?: string;
    status?: number;
};

export type LoginFormData = {
    email: string;
    password: string;
    rememberMe?:boolean
};

export type LoginResponse = {
    success?: boolean;
    token?: string;
    emailVerified?: boolean;
    message?: string;
    statusCode?: number;
    error?: string;
};