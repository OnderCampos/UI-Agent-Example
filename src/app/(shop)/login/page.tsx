"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

// Login form validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);

  // Get redirect URL from query params (for protected route redirects)
  const redirectUrl = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
      router.push(redirectUrl);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: err instanceof Error ? err.message : "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to <span className="text-[#0052a1]">Price</span>
            <span className="text-[#f5a623]">Smart</span>
          </h1>
          <p className="text-gray-600">
            Sign in to access your account and membership benefits
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-10 h-12 ${
                    errors.email 
                      ? "border-red-500 focus-visible:ring-red-500" 
                      : "border-gray-300 focus-visible:ring-[#0052a1]"
                  }`}
                  autoComplete="email"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#0052a1] hover:text-[#003d7a] font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`pl-10 pr-12 h-12 ${
                    errors.password 
                      ? "border-red-500 focus-visible:ring-red-500" 
                      : "border-gray-300 focus-visible:ring-[#0052a1]"
                  }`}
                  autoComplete="current-password"
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setValue("rememberMe", checked as boolean)}
                className="data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
              />
              <Label
                htmlFor="rememberMe"
                className="text-sm text-gray-600 cursor-pointer select-none"
              >
                Keep me signed in for 30 days
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#0052a1] hover:bg-[#003d7a] text-white font-semibold text-base transition-colors"
              disabled={isLoading || isSubmitting}
            >
              {(isLoading || isSubmitting) ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to PriceSmart?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link href="/register" className="block">
            <Button
              variant="outline"
              className="w-full h-12 border-[#0052a1] text-[#0052a1] hover:bg-[#0052a1] hover:text-white font-semibold text-base transition-colors"
            >
              Create an Account
            </Button>
          </Link>
        </div>

        {/* Member Benefits */}
        <div className="mt-8 bg-gradient-to-r from-[#0052a1] to-[#003d7a] rounded-xl p-6 text-white">
          <h3 className="font-semibold text-lg mb-3">Member Benefits</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#f5a623] rounded-full" />
              Access exclusive member-only prices
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#f5a623] rounded-full" />
              Track orders and view purchase history
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#f5a623] rounded-full" />
              Save addresses for faster checkout
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#f5a623] rounded-full" />
              Manage your membership digitally
            </li>
          </ul>
        </div>

        {/* Demo Mode Notice */}
        <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-center">
          <p className="text-sm text-amber-800">
            <strong>Demo Mode:</strong> Use any email and password to sign in
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0052a1]" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
