"use client";

import { useState, useCallback, useEffect } from "react";
import type { User } from "@/types/user";

interface LoginOptions {
  rememberMe?: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth status on mount
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (data.success && data.data) {
        setUser(data.data);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login with optional remember me
  const login = useCallback(async (
    email: string, 
    password: string, 
    options?: LoginOptions
  ) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password,
          rememberMe: options?.rememberMe ?? false,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data.user);
        setIsAuthenticated(true);
        return data.data;
      } else {
        throw new Error(data.error?.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register new user
  const register = useCallback(async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    acceptTerms: boolean;
    subscribeNewsletter?: boolean;
  }) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data.user);
        setIsAuthenticated(true);
        return data.data;
      } else {
        throw new Error(data.error?.message || "Registration failed");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Request password reset
  const requestPasswordReset = useCallback(async (email: string) => {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error?.message || "Failed to send reset email");
    }

    return data;
  }, []);

  // Reset password with token
  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error?.message || "Failed to reset password");
    }

    return data;
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
    refresh: checkAuth,
  };
}
