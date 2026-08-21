/**
 * Support-related types
 */

/**
 * Support ticket types
 */
export type SupportTicketType = 
  | "general"
  | "order"
  | "return"
  | "technical"
  | "billing"
  | "membership"
  | "feedback";

/**
 * Support ticket status
 */
export type SupportTicketStatus = 
  | "open"
  | "pending"
  | "in_progress"
  | "waiting_customer"
  | "resolved"
  | "closed";

/**
 * Support ticket priority
 */
export type SupportTicketPriority = "low" | "normal" | "high" | "urgent";

/**
 * Support ticket
 */
export interface SupportTicket {
  id: string;
  type: SupportTicketType;
  subject: string;
  message: string;
  orderId?: string;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  customerEmail: string;
  customerName: string;
  attachments?: SupportAttachment[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

/**
 * Support attachment
 */
export interface SupportAttachment {
  id: string;
  filename: string;
  url: string;
  contentType: string;
  size: number;
}

/**
 * Contact form submission
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  type: SupportTicketType;
  message: string;
  orderId?: string;
}

/**
 * Order issue form data
 */
export interface OrderIssueFormData {
  orderId: string;
  issueType: OrderIssueType;
  affectedItems?: string[];
  description: string;
  preferredResolution: OrderResolution;
  attachments?: File[];
}

/**
 * Order issue types
 */
export type OrderIssueType =
  | "damaged"
  | "missing_items"
  | "wrong_items"
  | "late_delivery"
  | "never_received"
  | "quality"
  | "other";

/**
 * Preferred resolution
 */
export type OrderResolution =
  | "refund"
  | "replacement"
  | "store_credit"
  | "other";

/**
 * Chat message
 */
export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot" | "agent";
  timestamp: string;
  isRead: boolean;
}

/**
 * Chat session
 */
export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  status: "active" | "waiting" | "closed";
  startedAt: string;
  agentName?: string;
}
