"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  Mail, 
  Lock, 
  User, 
  Phone,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

// Registration form validation schema
const registerSchema = z.object({
  // Step 1: Personal Info
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-+()]+$/.test(val),
      "Please enter a valid phone number"
    ),
  
  // Step 2: Account Info
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  
  // Step 3: Terms & Preferences
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  subscribeNewsletter: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const steps = [
  { id: 1, name: "Personal Info", description: "Your basic information" },
  { id: 2, name: "Account", description: "Create your credentials" },
  { id: 3, name: "Terms", description: "Review and accept" },
];

// Password strength calculator
function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
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

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      subscribeNewsletter: false,
    },
    mode: "onChange",
  });

  const password = watch("password");
  const acceptTerms = watch("acceptTerms");
  const subscribeNewsletter = watch("subscribeNewsletter");
  const passwordStrength = getPasswordStrength(password || "");

  // Validate current step fields before proceeding
  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(["firstName", "lastName"]);
      case 2:
        return await trigger(["email", "password", "confirmPassword"]);
      case 3:
        return await trigger(["acceptTerms"]);
      default:
        return true;
    }
  };

  const handleNextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        acceptTerms: data.acceptTerms,
        subscribeNewsletter: data.subscribeNewsletter,
      });
      
      toast({
        title: "Account created!",
        description: "Welcome to PriceSmart. Your account has been created successfully.",
      });
      
      router.push("/");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Join PriceSmart and enjoy exclusive member benefits
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step.id < currentStep
                        ? "bg-green-500 text-white"
                        : step.id === currentStep
                        ? "bg-[#0052a1] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center hidden sm:block">
                    <p className={`text-sm font-medium ${
                      step.id <= currentStep ? "text-gray-900" : "text-gray-400"
                    }`}>
                      {step.name}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                      step.id < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h2>

                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="h-5 w-5" />
                    </div>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className={`pl-10 h-12 ${
                        errors.firstName 
                          ? "border-red-500 focus-visible:ring-red-500" 
                          : "border-gray-300 focus-visible:ring-[#0052a1]"
                      }`}
                      autoComplete="given-name"
                      {...register("firstName")}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="h-5 w-5" />
                    </div>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className={`pl-10 h-12 ${
                        errors.lastName 
                          ? "border-red-500 focus-visible:ring-red-500" 
                          : "border-gray-300 focus-visible:ring-[#0052a1]"
                      }`}
                      autoComplete="family-name"
                      {...register("lastName")}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className={`pl-10 h-12 ${
                        errors.phone 
                          ? "border-red-500 focus-visible:ring-red-500" 
                          : "border-gray-300 focus-visible:ring-[#0052a1]"
                      }`}
                      autoComplete="tel"
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Account Credentials */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Account Credentials
                </h2>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address <span className="text-red-500">*</span>
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
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className={`pl-10 pr-12 h-12 ${
                        errors.password 
                          ? "border-red-500 focus-visible:ring-red-500" 
                          : "border-gray-300 focus-visible:ring-[#0052a1]"
                      }`}
                      autoComplete="new-password"
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
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Password strength:</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength.label === "Weak" ? "text-red-500" :
                          passwordStrength.label === "Fair" ? "text-yellow-600" :
                          passwordStrength.label === "Good" ? "text-blue-500" :
                          "text-green-500"
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-12 h-12 ${
                        errors.confirmPassword 
                          ? "border-red-500 focus-visible:ring-red-500" 
                          : "border-gray-300 focus-visible:ring-[#0052a1]"
                      }`}
                      autoComplete="new-password"
                      {...register("confirmPassword")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className={`flex items-center gap-2 ${password?.length >= 8 ? "text-green-600" : ""}`}>
                      {password?.length >= 8 ? <Check className="w-4 h-4" /> : <span className="w-4 h-4 rounded-full border border-gray-300" />}
                      At least 8 characters
                    </li>
                    <li className={`flex items-center gap-2 ${/[A-Z]/.test(password || "") ? "text-green-600" : ""}`}>
                      {/[A-Z]/.test(password || "") ? <Check className="w-4 h-4" /> : <span className="w-4 h-4 rounded-full border border-gray-300" />}
                      One uppercase letter
                    </li>
                    <li className={`flex items-center gap-2 ${/[a-z]/.test(password || "") ? "text-green-600" : ""}`}>
                      {/[a-z]/.test(password || "") ? <Check className="w-4 h-4" /> : <span className="w-4 h-4 rounded-full border border-gray-300" />}
                      One lowercase letter
                    </li>
                    <li className={`flex items-center gap-2 ${/[0-9]/.test(password || "") ? "text-green-600" : ""}`}>
                      {/[0-9]/.test(password || "") ? <Check className="w-4 h-4" /> : <span className="w-4 h-4 rounded-full border border-gray-300" />}
                      One number
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: Terms & Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Terms & Preferences
                </h2>

                {/* Terms and Conditions */}
                <div className={`p-4 rounded-lg border ${
                  errors.acceptTerms ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                }`}>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="acceptTerms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setValue("acceptTerms", checked as boolean)}
                      className="mt-1 data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
                    />
                    <Label
                      htmlFor="acceptTerms"
                      className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#0052a1] hover:underline font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#0052a1] hover:underline font-medium">
                        Privacy Policy
                      </Link>
                      . I understand that my personal information will be processed as described.
                      <span className="text-red-500"> *</span>
                    </Label>
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.acceptTerms.message}
                    </p>
                  )}
                </div>

                {/* Newsletter Subscription */}
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="subscribeNewsletter"
                      checked={subscribeNewsletter}
                      onCheckedChange={(checked) => setValue("subscribeNewsletter", checked as boolean)}
                      className="mt-1 data-[state=checked]:bg-[#0052a1] data-[state=checked]:border-[#0052a1]"
                    />
                    <Label
                      htmlFor="subscribeNewsletter"
                      className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                    >
                      <span className="font-medium">Subscribe to our newsletter</span>
                      <br />
                      <span className="text-gray-500">
                        Receive exclusive deals, new product announcements, and member-only offers.
                      </span>
                    </Label>
                  </div>
                </div>

                {/* Membership Notice */}
                <div className="p-4 rounded-lg bg-[#0052a1]/5 border border-[#0052a1]/20">
                  <h4 className="font-medium text-[#0052a1] mb-2">Already have a PriceSmart membership?</h4>
                  <p className="text-sm text-gray-600">
                    After creating your account, you can link your existing membership card in your account settings to access all your member benefits online.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="border-gray-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-[#0052a1] hover:bg-[#003d7a]"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#0052a1] hover:bg-[#003d7a] min-w-[140px]"
                  disabled={isLoading || isSubmitting}
                >
                  {(isLoading || isSubmitting) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              )}
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm border-t pt-6">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="text-[#0052a1] hover:text-[#003d7a] font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Demo Mode Notice */}
        <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-center">
          <p className="text-sm text-amber-800">
            <strong>Demo Mode:</strong> Registration will simulate account creation
          </p>
        </div>
      </div>
    </div>
  );
}
