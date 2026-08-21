/**
 * Authentication Service
 * Orchestrates authentication operations across Digital Identity and Membership APIs
 */

import { getDigitalIdentityAdapter } from "@/integrations/external-apis/digital-identity";
import { getMembershipAdapter } from "@/integrations/external-apis/membership";
import type { User, AuthTokens, LoginCredentials, RegisterData, Session } from "@/types/user";
import { logger } from "@/lib/logger";
import { USE_MOCKS } from "@/lib/constants";

const log = logger.child("AuthService");

/**
 * Authentication service class
 */
export class AuthService {
  private identityAdapter = getDigitalIdentityAdapter();
  private membershipAdapter = getMembershipAdapter();

  /**
   * Login with credentials
   */
  async login(credentials: LoginCredentials): Promise<Session> {
    log.debug("Processing login", { email: credentials.email });

    if (USE_MOCKS) {
      return this.mockLogin(credentials);
    }

    // Authenticate with Digital Identity
    const { user, tokens } = await this.identityAdapter.login(credentials);

    // Fetch membership data
    const membership = await this.membershipAdapter.getMembershipByCustomerId(user.id);

    const fullUser: User = {
      ...user,
      membership: membership || undefined,
    };

    // Calculate session expiry
    const expiresAt = new Date(Date.now() + tokens.expiresIn * 1000).toISOString();

    return {
      user: fullUser,
      tokens,
      expiresAt,
    };
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<Session> {
    log.debug("Processing registration", { email: data.email });

    if (USE_MOCKS) {
      return this.mockRegister(data);
    }

    // Register with Digital Identity
    const { user, tokens } = await this.identityAdapter.register(data);

    const fullUser: User = {
      ...user,
      membership: undefined,
    };

    const expiresAt = new Date(Date.now() + tokens.expiresIn * 1000).toISOString();

    return {
      user: fullUser,
      tokens,
      expiresAt,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    log.debug("Refreshing token");

    if (USE_MOCKS) {
      return this.mockRefreshToken();
    }

    return this.identityAdapter.refreshToken(refreshToken);
  }

  /**
   * Logout user
   */
  async logout(accessToken: string): Promise<void> {
    log.debug("Processing logout");

    if (USE_MOCKS) {
      return;
    }

    await this.identityAdapter.logout(accessToken);
  }

  /**
   * Get current user from token
   */
  async getCurrentUser(accessToken: string): Promise<User> {
    log.debug("Fetching current user");

    if (USE_MOCKS) {
      return this.mockGetCurrentUser();
    }

    const profile = await this.identityAdapter.getProfile(accessToken);
    const membership = await this.membershipAdapter.getMembershipByCustomerId(profile.id);

    return {
      ...profile,
      membership: membership || undefined,
    };
  }

  /**
   * Update user profile
   */
  async updateProfile(
    accessToken: string,
    data: Partial<{
      firstName: string;
      lastName: string;
      phone: string;
      dateOfBirth: string;
    }>
  ): Promise<User> {
    log.debug("Updating profile");

    if (USE_MOCKS) {
      return this.mockGetCurrentUser();
    }

    const profile = await this.identityAdapter.updateProfile(accessToken, data);
    const membership = await this.membershipAdapter.getMembershipByCustomerId(profile.id);

    return {
      ...profile,
      membership: membership || undefined,
    };
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    log.debug("Requesting password reset", { email });

    if (USE_MOCKS) {
      // In mock mode, just simulate success
      return;
    }

    // In production, this would call the Digital Identity API
    // to send a password reset email
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    log.debug("Resetting password");

    if (USE_MOCKS) {
      // In mock mode, just simulate success
      return;
    }

    // In production, this would call the Digital Identity API
    // to reset the password using the token
  }

  /**
   * Change password (for authenticated users)
   */
  async changePassword(
    accessToken: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    log.debug("Changing password");

    if (USE_MOCKS) {
      // In mock mode, just simulate success
      return;
    }

    // In production, this would call the Digital Identity API
    // to change the password
  }

  // ============================================
  // Mock implementations
  // ============================================

  private mockLogin(credentials: LoginCredentials): Session {
    const user = this.getMockUser();
    const tokens = this.getMockTokens();

    return {
      user,
      tokens,
      expiresAt: new Date(Date.now() + tokens.expiresIn * 1000).toISOString(),
    };
  }

  private mockRegister(data: RegisterData): Session {
    const user: User = {
      id: "mock-user-new",
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      locale: "en-US",
      currency: "USD",
      emailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const tokens = this.getMockTokens();

    return {
      user,
      tokens,
      expiresAt: new Date(Date.now() + tokens.expiresIn * 1000).toISOString(),
    };
  }

  private mockRefreshToken(): AuthTokens {
    return this.getMockTokens();
  }

  private mockGetCurrentUser(): User {
    return this.getMockUser();
  }

  private getMockUser(): User {
    return {
      id: "mock-user-1",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      fullName: "John Doe",
      phone: "+1 555 123 4567",
      locale: "en-US",
      currency: "USD",
      emailVerified: true,
      membership: {
        id: "mock-membership-1",
        memberId: "MEM-12345",
        type: "premium",
        status: "active",
        tier: "Gold",
        points: 5000,
        startDate: "2024-01-01T00:00:00Z",
        expirationDate: "2025-01-01T00:00:00Z",
        benefits: [
          {
            id: "benefit-1",
            name: "Free Shipping",
            description: "Free shipping on all orders",
            type: "freeShipping",
          },
          {
            id: "benefit-2",
            name: "5% Discount",
            description: "5% off all purchases",
            type: "discount",
            value: 5,
          },
        ],
      },
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: new Date().toISOString(),
    };
  }

  private getMockTokens(): AuthTokens {
    return {
      accessToken: "mock-access-token-" + Date.now(),
      refreshToken: "mock-refresh-token-" + Date.now(),
      expiresIn: 3600,
      tokenType: "Bearer",
    };
  }
}

// Export singleton instance
let authServiceInstance: AuthService | null = null;

export function getAuthService(): AuthService {
  if (!authServiceInstance) {
    authServiceInstance = new AuthService();
  }
  return authServiceInstance;
}
