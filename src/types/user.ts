/**
 * User-related types
 */

import type { Address } from "@/lib/validation";

/**
 * User entity
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  locale: string;
  currency: string;
  emailVerified: boolean;
  membership?: UserMembership;
  createdAt: string;
  updatedAt: string;
}

/**
 * User membership information
 */
export interface UserMembership {
  id: string;
  memberId: string;
  type: MembershipType;
  status: MembershipStatus;
  tier?: string;
  points?: number;
  startDate: string;
  expirationDate: string;
  benefits: MembershipBenefit[];
}

/**
 * Membership types
 */
export type MembershipType = "basic" | "premium" | "business";

/**
 * Membership statuses
 */
export type MembershipStatus = "active" | "expired" | "suspended" | "cancelled";

/**
 * Membership benefit
 */
export interface MembershipBenefit {
  id: string;
  name: string;
  description: string;
  type: "discount" | "freeShipping" | "earlyAccess" | "exclusive" | "other";
  value?: number;
}

/**
 * User address with metadata
 */
export interface UserAddress extends Address {
  id: string;
  label?: string;
  isDefault: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

/**
 * User preferences
 */
export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  language: string;
  currency: string;
  timezone: string;
}

/**
 * Authentication tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Registration data
 */
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptTerms: boolean;
  subscribeNewsletter?: boolean;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset confirmation
 */
export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

/**
 * Profile update data
 */
export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
}

/**
 * Password change data
 */
export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

/**
 * Session info
 */
export interface Session {
  user: User;
  tokens: AuthTokens;
  expiresAt: string;
}
