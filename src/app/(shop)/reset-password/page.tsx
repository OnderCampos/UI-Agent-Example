"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, CheckCircle, AlertCircle, ArrowLeft, Check } from "lucide-react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface PasswordStrengthResult {
  score: number;
  label: string;
  color: string;
}

// Password strength calculator
function getPasswordStrength(password: string): PasswordStrengthResult {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
  if (score <= 4) return { score, label: "Fair", color: "bg-yellow-500" };
  if (score <= 5) return { score, label: "Good", color: "bg-blue-500" };
  return { score, label: "Strong", color: "bg-green-500" };
}

function getStrengthTextColor(label: string): string {
  switch (label) {
    case "Weak":
      return "text-red-500";
    case "Fair":
      return "text-yellow-600";
    case "Good":
      return "text-blue-500";
    default:
      return "text-green-500";
  }
}

function PasswordStrengthIndicator({ password }: { password: string }) {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const textColor = getStrengthTextColor(strength.label);

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">Password strength:</span>
        <span className={`text-xs font-medium ${textColor}`}>
          {strength.label}
        </span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${(strength.score / 6) * 100}%` }}
        />
      </div>
    </div>
  );
}

function PasswordRequirement({
  met,
  label,
}: {
  met: boolean;
  label: string;
}) {
  return (
    <li className={`flex items-center gap-2 ${met ? "text-green-600" : ""}`}>
      {met ? (
        <Check className="w-4 h-4" />
      ) : (
        <span className="w-4 h-4 rounded-full border border-gray-300" />
      )}
      {label}
    </li>
  );
}

function PasswordRequirements({ password }: { password: string }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
      <ul className="space-y-1 text-sm text-gray-600">
        <PasswordRequirement met={password.length >= 8} label="At least 8 characters" />
        <PasswordRequirement met={/[A-Z]/.test(password)} label="One uppercase letter" />
        <PasswordRequirement met={/[a-z]/.test(password)} label="One lowercase letter" />
        <PasswordRequirement met={/[0-9]/.test(password)} label="One number" />
      </ul>
    </div>
  );
}

function InvalidTokenState() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Invalid Reset Link
        </h1>

        <p className="text-gray-600 mb-6">
          This password reset link is invalid or has expired. Please request a new one.
        </p>

        <Link href="/forgot-password">
          <Button className="bg-[#0052a1] hover:bg-[#003d7a]">
            Request New Link
          </Button>
        </Link>
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Password Reset Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Your password has been changed. You can now sign in with your new password.
        </p>

        <Link href="/login">
          <Button className="bg-[#0052a1] hover:bg-[#003d7a]">
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}

interface PasswordInputProps {
  id: string;
  label: string;
  error?: string;
  placeholder: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  registration: UseFormRegisterReturn;
}

function PasswordInput({
  id,
  label,
  error,
  placeholder,
  showPassword,
  onToggleVisibility,
  registration,
}: PasswordInputProps) {
  const inputClasses = `pl-10 pr-12 h-12 ${
    error
      ? "border-red-500 focus-visible:ring-red-500"
      : "border-gray-300 focus-visible:ring-[#0052a1]"
  }`;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-gray-700 font-medium">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Lock className="h-5 w-5" />
        </div>
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={inputClasses}
          autoComplete="new-password"
          {...registration}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          onClick={onToggleVisibility}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password") || "";

  if (!token) {
    return <InvalidTokenState />;
  }

  if (isSuccess) {
    return <SuccessState />;
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true);

    try {
      await resetPassword(token, data.password);
      setIsSuccess(true);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: err instanceof Error ? err.message : "Unable to reset password. The link may have expired.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-gray-600 hover:text-[#0052a1] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Sign In
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Password
          </h1>
          <p className="text-gray-600">
            Your new password must be different from previous passwords.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password */}
            <div className="space-y-2">
              <PasswordInput
                id="password"
                label="New Password"
                error={errors.password?.message}
                placeholder="Enter new password"
                showPassword={showPassword}
                onToggleVisibility={() => setShowPassword((prev) => !prev)}
                registration={register("password")}
              />
              <PasswordStrengthIndicator password={password} />
            </div>

            {/* Confirm Password */}
            <PasswordInput
              id="confirmPassword"
              label="Confirm New Password"
              error={errors.confirmPassword?.message}
              placeholder="Confirm new password"
              showPassword={showConfirmPassword}
              onToggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
              registration={register("confirmPassword")}
            />

            {/* Password Requirements */}
            <PasswordRequirements password={password} />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#0052a1] hover:bg-[#003d7a] text-white font-semibold text-base transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0052a1]" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
