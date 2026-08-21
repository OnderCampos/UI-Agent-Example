"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Loader2,
  Check,
  Pencil,
  X,
  Eye,
  EyeOff,
  Lock
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const { user, refresh } = useAuth();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      resetProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
      });
    }
  }, [user, resetProfile]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    
    try {
      // In a real app, this would call the API
      await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      await refresh();
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (_err) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsSaving(true);
    
    try {
      await fetch("/api/user/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });
      
      resetPassword();
      setIsChangingPassword(false);
      
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      });
    } catch (_err) {
      toast({
        variant: "destructive",
        title: "Password change failed",
        description: "Failed to change password. Please verify your current password.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    if (user) {
      resetProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-[#0052a1] hover:bg-[#003d7a]"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Form */}
      <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-700">
              First Name
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <Input
                id="firstName"
                {...registerProfile("firstName")}
                disabled={!isEditing}
                className={`pl-10 h-12 ${
                  profileErrors.firstName 
                    ? "border-red-500" 
                    : "border-gray-300"
                } ${!isEditing ? "bg-gray-50" : ""}`}
              />
            </div>
            {profileErrors.firstName && (
              <p className="text-sm text-red-500">{profileErrors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-gray-700">
              Last Name
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <Input
                id="lastName"
                {...registerProfile("lastName")}
                disabled={!isEditing}
                className={`pl-10 h-12 ${
                  profileErrors.lastName 
                    ? "border-red-500" 
                    : "border-gray-300"
                } ${!isEditing ? "bg-gray-50" : ""}`}
              />
            </div>
            {profileErrors.lastName && (
              <p className="text-sm text-red-500">{profileErrors.lastName.message}</p>
            )}
          </div>

          {/* Email (Read Only) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="pl-10 h-12 bg-gray-50 border-gray-300"
              />
            </div>
            <p className="text-xs text-gray-500">
              Contact support to change your email address
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">
              Phone Number
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="h-5 w-5" />
              </div>
              <Input
                id="phone"
                type="tel"
                {...registerProfile("phone")}
                disabled={!isEditing}
                placeholder="+1 (555) 123-4567"
                className={`pl-10 h-12 border-gray-300 ${!isEditing ? "bg-gray-50" : ""}`}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-gray-700">
              Date of Birth
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Calendar className="h-5 w-5" />
              </div>
              <Input
                id="dateOfBirth"
                type="date"
                {...registerProfile("dateOfBirth")}
                disabled={!isEditing}
                className={`pl-10 h-12 border-gray-300 ${!isEditing ? "bg-gray-50" : ""}`}
              />
            </div>
          </div>
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex items-center gap-3 mt-6 pt-6 border-t">
            <Button
              type="submit"
              className="bg-[#0052a1] hover:bg-[#003d7a]"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={cancelEdit}
              disabled={isSaving}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </form>

      {/* Change Password Section */}
      <div className="pt-8 border-t">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Password</h2>
            <p className="text-gray-600">Change your account password</p>
          </div>
          {!isChangingPassword && (
            <Button
              variant="outline"
              onClick={() => setIsChangingPassword(true)}
              className="border-gray-300"
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          )}
        </div>

        {isChangingPassword && (
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6 max-w-md">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-gray-700">
                Current Password
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  {...registerPassword("currentPassword")}
                  className={`pl-10 pr-12 h-12 ${
                    passwordErrors.currentPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-sm text-red-500">{passwordErrors.currentPassword.message}</p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-700">
                New Password
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...registerPassword("newPassword")}
                  className={`pl-10 pr-12 h-12 ${
                    passwordErrors.newPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
              {passwordErrors.newPassword && (
                <p className="text-sm text-red-500">{passwordErrors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm New Password
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...registerPassword("confirmPassword")}
                  className={`pl-10 h-12 ${
                    passwordErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {passwordErrors.confirmPassword && (
                <p className="text-sm text-red-500">{passwordErrors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                className="bg-[#0052a1] hover:bg-[#003d7a]"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsChangingPassword(false);
                  resetPassword();
                }}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Account Info */}
      <div className="pt-8 border-t">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm text-gray-500">Account Created</dt>
            <dd className="text-gray-900 font-medium">
              {user?.createdAt 
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-"}
            </dd>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm text-gray-500">Email Verified</dt>
            <dd className="text-gray-900 font-medium flex items-center gap-2">
              {user?.emailVerified ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  Verified
                </>
              ) : (
                <>
                  <X className="w-4 h-4 text-red-500" />
                  Not verified
                </>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
