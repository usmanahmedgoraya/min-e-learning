'use server';

import { FormValues, VerifyEmailFormData, ActionResponse, LoginResponse, LoginFormData } from '@/types/auth.type';
import { cookies } from 'next/headers';

const domain = process.env.NEXT_PUBLIC_API_URL;

// Sign-up Action
export const signUpAction = async (formData: FormValues): Promise<ActionResponse> => {
  const rawFormData = {
    fullName: formData.name,
    email: formData.email,
    password: formData.password,
    termsAccepted: formData.agreeTerms,
  };

  try {
    const response = await fetch(`${domain}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: rawFormData.fullName,
        email: rawFormData.email,
        password: rawFormData.password,
      }),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        return { error: 'Email already exists' };
      }
      return { error: data.message || 'Signup failed' };
    }

    // Store email for verification
    const cookieStore = await cookies();
    if (typeof rawFormData.email === 'string') {
      cookieStore.set('verify-email', rawFormData.email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 1.25,
      });
    } else {
      return { error: 'Email is not a valid string' };
    }

    return { success: data.message || 'Signup successful. Please verify your email.' };
  } catch (error) {
    console.error('Signup error:', error);
    return { error: 'An unexpected error occurred' };
  }
};

// verify Account Action
export const verifyEmailAction = async (
  formData: VerifyEmailFormData
): Promise<ActionResponse> => {
  const { email, otp } = formData;

  // Basic validation
  if (!email || !otp) {
    return { error: 'Email and OTP are required' };
  }

  if (otp.length !== 4) {
    return { error: 'OTP must be 4 digits' };
  }

  try {
    const response = await fetch(`${domain}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || 'Email verification failed',
        status: response.status
      };
    }

    // Clear verification email cookie
    const cookieStore = await cookies();
    cookieStore.delete('verify-email');

    // Set auth token as HTTP-only cookie
    cookieStore.set('auth-token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return {
      success: 'Email successfully verified',
    };
  } catch (error) {
    console.error('Verification error:', error);
    return { error: 'An unexpected error occurred' };
  }
};

// Login Action
export const loginAction = async (formData: LoginFormData): Promise<LoginResponse> => {
  const cookieStore = await cookies();
  const { email, password, rememberMe } = formData;

  // Client-side validation
  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const response = await fetch(`${domain}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });

    const data: LoginResponse = await response.json();

    // Handle specific status codes
    if (response.status === 401) {
      return { error: data.message || 'Invalid credentials' };
    }

    // Handle unverified email case
    if (data.emailVerified === false) {
      cookieStore.set('verify-email', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 1.25,
      });
      return {
        message: data.message || 'Please verify your email',
        emailVerified: false
      };
    }

    // Handle other errors
    if (!response.ok) {
      return {
        error: data.message || data.error || 'Login failed',
        statusCode: response.status
      };
    }

    // Successful login

    cookieStore.set('auth-token', data.token || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? 60 * 60 * 24 * 7 : undefined,
      path: '/',
    });

    return {
      success: true,
      message: 'Login successful',
      // token: data.token
    };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred' };
  }
};