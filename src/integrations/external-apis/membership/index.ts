/**
 * Membership API Adapter
 * Handles membership and loyalty program operations
 */

import { ExternalApiAdapter, type ExternalApiConfig } from "../base";
import { ExternalServiceError, NotFoundError } from "@/lib/errors";
import type {
  UserMembership,
  MembershipType,
  MembershipStatus,
  MembershipBenefit,
} from "@/types/user";

/**
 * Membership API configuration
 */
export type MembershipConfig = ExternalApiConfig;

/**
 * Membership API response types
 */
interface MembershipResponse {
  id: string;
  memberId: string;
  customerId: string;
  type: string;
  status: string;
  tier?: string;
  points?: number;
  startDate: string;
  expirationDate: string;
  benefits: {
    id: string;
    name: string;
    description: string;
    type: string;
    value?: number;
  }[];
}

interface MembershipTransactionResponse {
  id: string;
  memberId: string;
  type: "earn" | "redeem" | "adjust" | "expire";
  points: number;
  balance: number;
  description: string;
  orderId?: string;
  createdAt: string;
}

/**
 * Gets configuration from environment variables
 */
export function getMembershipConfig(): MembershipConfig {
  return {
    baseUrl: process.env.MEMBERSHIP_API_URL || "",
    apiKey: process.env.MEMBERSHIP_API_KEY,
  };
}

/**
 * Membership API adapter
 */
export class MembershipAdapter extends ExternalApiAdapter<MembershipConfig> {
  constructor(config?: MembershipConfig) {
    super("Membership", config || getMembershipConfig());
  }

  /**
   * Converts API response to UserMembership type
   */
  private toUserMembership(response: MembershipResponse): UserMembership {
    return {
      id: response.id,
      memberId: response.memberId,
      type: response.type as MembershipType,
      status: response.status as MembershipStatus,
      tier: response.tier,
      points: response.points,
      startDate: response.startDate,
      expirationDate: response.expirationDate,
      benefits: response.benefits.map((b) => ({
        id: b.id,
        name: b.name,
        description: b.description,
        type: b.type as MembershipBenefit["type"],
        value: b.value,
      })),
    };
  }

  /**
   * Get membership by customer ID
   */
  async getMembershipByCustomerId(customerId: string): Promise<UserMembership | null> {
    this.log.debug("Fetching membership by customer ID", { customerId });

    try {
      const response = await this.client.get<MembershipResponse>(
        `/memberships/customer/${customerId}`
      );

      return this.toUserMembership(response.data);
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode === 404) {
        return null;
      }
      throw new ExternalServiceError(
        "Membership",
        "Failed to fetch membership",
        error
      );
    }
  }

  /**
   * Get membership by member ID
   */
  async getMembershipByMemberId(memberId: string): Promise<UserMembership> {
    this.log.debug("Fetching membership by member ID", { memberId });

    try {
      const response = await this.client.get<MembershipResponse>(
        `/memberships/${memberId}`
      );

      return this.toUserMembership(response.data);
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode === 404) {
        throw new NotFoundError("Membership", `Membership ${memberId} not found`);
      }
      throw new ExternalServiceError(
        "Membership",
        "Failed to fetch membership",
        error
      );
    }
  }

  /**
   * Check membership status
   */
  async checkMembershipStatus(memberId: string): Promise<{
    isActive: boolean;
    status: MembershipStatus;
    daysUntilExpiration: number;
  }> {
    this.log.debug("Checking membership status", { memberId });

    try {
      const response = await this.client.get<{
        isActive: boolean;
        status: string;
        daysUntilExpiration: number;
      }>(`/memberships/${memberId}/status`);

      return {
        isActive: response.data.isActive,
        status: response.data.status as MembershipStatus,
        daysUntilExpiration: response.data.daysUntilExpiration,
      };
    } catch (error) {
      throw new ExternalServiceError(
        "Membership",
        "Failed to check membership status",
        error
      );
    }
  }

  /**
   * Get membership points balance
   */
  async getPointsBalance(memberId: string): Promise<{
    available: number;
    pending: number;
    expiringSoon: number;
    expirationDate?: string;
  }> {
    this.log.debug("Fetching points balance", { memberId });

    try {
      const response = await this.client.get<{
        available: number;
        pending: number;
        expiringSoon: number;
        expirationDate?: string;
      }>(`/memberships/${memberId}/points`);

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Membership",
        "Failed to fetch points balance",
        error
      );
    }
  }

  /**
   * Get points transaction history
   */
  async getPointsHistory(
    memberId: string,
    options: { page?: number; limit?: number } = {}
  ): Promise<{
    transactions: MembershipTransactionResponse[];
    total: number;
  }> {
    const { page = 1, limit = 20 } = options;

    this.log.debug("Fetching points history", { memberId, page, limit });

    try {
      const response = await this.client.get<{
        transactions: MembershipTransactionResponse[];
        total: number;
      }>(`/memberships/${memberId}/transactions`, {
        params: { page, limit },
      });

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Membership",
        "Failed to fetch points history",
        error
      );
    }
  }

  /**
   * Earn points from a purchase
   */
  async earnPoints(
    memberId: string,
    data: {
      orderId: string;
      amount: number;
      description?: string;
    }
  ): Promise<{ points: number; newBalance: number }> {
    this.log.debug("Earning points", { memberId, orderId: data.orderId });

    try {
      const response = await this.client.post<{
        points: number;
        newBalance: number;
      }>(`/memberships/${memberId}/earn`, {
        orderId: data.orderId,
        amount: data.amount,
        description: data.description,
      });

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Membership",
        "Failed to earn points",
        error
      );
    }
  }

  /**
   * Redeem points
   */
  async redeemPoints(
    memberId: string,
    data: {
      points: number;
      orderId?: string;
      description?: string;
    }
  ): Promise<{ redeemed: number; newBalance: number }> {
    this.log.debug("Redeeming points", { memberId, points: data.points });

    try {
      const response = await this.client.post<{
        redeemed: number;
        newBalance: number;
      }>(`/memberships/${memberId}/redeem`, {
        points: data.points,
        orderId: data.orderId,
        description: data.description,
      });

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Membership",
        "Failed to redeem points",
        error
      );
    }
  }

  /**
   * Get available benefits
   */
  async getAvailableBenefits(memberId: string): Promise<MembershipBenefit[]> {
    this.log.debug("Fetching available benefits", { memberId });

    try {
      const response = await this.client.get<{
        benefits: MembershipResponse["benefits"];
      }>(`/memberships/${memberId}/benefits`);

      return response.data.benefits.map((b) => ({
        id: b.id,
        name: b.name,
        description: b.description,
        type: b.type as MembershipBenefit["type"],
        value: b.value,
      }));
    } catch (error) {
      throw new ExternalServiceError(
        "Membership",
        "Failed to fetch benefits",
        error
      );
    }
  }

  /**
   * Renew membership
   */
  async renewMembership(
    memberId: string,
    data: { type?: MembershipType }
  ): Promise<UserMembership> {
    this.log.debug("Renewing membership", { memberId });

    try {
      const response = await this.client.post<MembershipResponse>(
        `/memberships/${memberId}/renew`,
        { type: data.type }
      );

      return this.toUserMembership(response.data);
    } catch (error) {
      throw new ExternalServiceError(
        "Membership",
        "Failed to renew membership",
        error
      );
    }
  }
}

// Export singleton instance
let instance: MembershipAdapter | null = null;

export function getMembershipAdapter(): MembershipAdapter {
  if (!instance) {
    instance = new MembershipAdapter();
  }
  return instance;
}
