/**
 * Digital Identity API Adapter
 * Handles authentication and identity management
 */

import { ExternalApiAdapter, type ExternalApiConfig } from "../base";
import { ExternalServiceError } from "@/lib/errors";
import type { User, AuthTokens, LoginCredentials, RegisterData } from "@/types/user";

/**
 * Digital Identity API configuration
 */
export interface DigitalIdentityConfig extends ExternalApiConfig {
  clientId?: string;
  clientSecret?: string;
}

/**
 * Digital Identity API response types
 */
interface DIUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  locale?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DITokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  scope?: string;
}

/**
 * Gets configuration from environment variables
 */
export function getDigitalIdentityConfig(): DigitalIdentityConfig {
  return {
    baseUrl: process.env.DIGITAL_IDENTITY_API_URL || "",
    apiKey: process.env.DIGITAL_IDENTITY_API_KEY,
  };
}

/**
 * Digital Identity API adapter
 */
export class DigitalIdentityAdapter extends ExternalApiAdapter<DigitalIdentityConfig> {
  constructor(config?: DigitalIdentityConfig) {
    super("DigitalIdentity", config || getDigitalIdentityConfig());
  }

  /**
   * Converts DI user response to User type
   */
  private toUser(diUser: DIUserResponse): Omit<User, "membership"> {
    return {
      id: diUser.id,
      email: diUser.email,
      firstName: diUser.firstName,
      lastName: diUser.lastName,
      fullName: `${diUser.firstName} ${diUser.lastName}`,
      phone: diUser.phone,
      dateOfBirth: diUser.dateOfBirth,
      locale: diUser.locale || "en-US",
      currency: "USD",
      emailVerified: diUser.emailVerified,
      createdAt: diUser.createdAt,
      updatedAt: diUser.updatedAt,
    };
  }

  /**
   * Converts DI token response to AuthTokens
   */
  private toAuthTokens(diTokens: DITokenResponse): AuthTokens {
    return {
      accessToken: diTokens.accessToken,
      refreshToken: diTokens.refreshToken,
      expiresIn: diTokens.expiresIn,
      tokenType: diTokens.tokenType,
    };
  }

  /**
   * Login with credentials
   */
  async login(credentials: LoginCredentials): Promise<{
    user: Omit<User, "membership">;
    tokens: AuthTokens;
  }> {
    this.log.debug("Logging in user", { email: credentials.email });

    try {
      const response = await this.client.post<{
        user: DIUserResponse;
        tokens: DITokenResponse;
      }>("/auth/login", {
        email: credentials.email,
        password: credentials.password,
        rememberMe: credentials.rememberMe,
      });

      return {
        user: this.toUser(response.data.user),
        tokens: this.toAuthTokens(response.data.tokens),
      };
    } catch (error) {
      throw new ExternalServiceError(
        "DigitalIdentity",
        "Login failed",
        error
      );
    }
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<{
    user: Omit<User, "membership">;
    tokens: AuthTokens;
  }> {
    this.log.debug("Registering new user", { email: data.email });

    try {
      const response = await this.client.post<{
        user: DIUserResponse;
        tokens: DITokenResponse;
      }>("/auth/register", {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        acceptTerms: data.acceptTerms,
        subscribeNewsletter: data.subscribeNewsletter,
      });

      return {
        user: this.toUser(response.data.user),
        tokens: this.toAuthTokens(response.data.tokens),
      };
    } catch (error) {
      throw new ExternalServiceError(
        "DigitalIdentity",
        "Registration failed",
        error
      );
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    this.log.debug("Refreshing access token");

    try {
      const response = await this.client.post<DITokenResponse>(
        "/auth/refresh",
        { refreshToken }
      );

      return this.toAuthTokens(response.data);
    } catch (error) {
      throw new ExternalServiceError(
        "DigitalIdentity",
        "Token refresh failed",
        error
      );
    }
  }

  /**
   * Logout (invalidate tokens)
   */
  async logout(accessToken: string): Promise<void> {
    this.log.debug("Logging out user");

    try {
      await this.client.post(
        "/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    } catch (error) {
      // Logout errors are non-critical
      this.log.warn("Logout request failed", { error });
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(accessToken: string): Promise<Omit<User, "membership">> {
    this.log.debug("Fetching user profile");

    try {
      const response = await this.client.get<DIUserResponse>("/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return this.toUser(response.data);
    } catch (error) {
      throw new ExternalServiceError(
        "DigitalIdentity",
        "Failed to get profile",
        error
      );
    }
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
  ): Promise<Omit<User, "membership">> {
    this.log.debug("Updating user profile");

    try {
      const response = await this.client.patch<DIUserResponse>(
        "/users/me",
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      return this.toUser(response.data);
    } catch (error) {
      throw new ExternalServiceError(
        "DigitalIdentity",
        "Failed to update profile",
        error
      );
    }
  }
}

// Export singleton instance
let instance: DigitalIdentityAdapter | null = null;

export function getDigitalIdentityAdapter(): DigitalIdentityAdapter {
  if (!instance) {
    instance = new DigitalIdentityAdapter();
  }
  return instance;
}
