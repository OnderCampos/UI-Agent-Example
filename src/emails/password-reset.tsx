/**
 * Password Reset Email Template
 */

import {
  EmailLayout,
  buttonStyle,
  headingStyle,
  paragraphStyle,
  cardStyle,
} from "./components/email-layout";
import type { PasswordResetEmailData } from "@/integrations/external-apis/notifications/types";

interface PasswordResetEmailProps {
  data: PasswordResetEmailData;
}

export function PasswordResetEmail({ data }: PasswordResetEmailProps) {
  return (
    <EmailLayout preview="Reset your PriceSmart password">
      {/* Header */}
      <h1 style={headingStyle}>Reset Your Password</h1>
      <p style={paragraphStyle}>
        Hi {data.customerName},
      </p>
      <p style={paragraphStyle}>
        We received a request to reset your password. Click the button below to choose a new password.
      </p>

      {/* Reset Button */}
      <div style={{ textAlign: "center" as const, margin: "40px 0" }}>
        <a href={data.resetUrl} style={buttonStyle}>
          Reset Password
        </a>
      </div>

      {/* Expiration Warning */}
      <div style={{ ...cardStyle, backgroundColor: "#fef3c7", border: "1px solid #fcd34d" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#92400e" }}>
          <strong>This link expires in {data.expiresIn}.</strong>
          <br />
          If you didn't request a password reset, you can safely ignore this email.
        </p>
      </div>

      {/* Alternative Link */}
      <div style={{ marginTop: "30px" }}>
        <p style={{ ...paragraphStyle, fontSize: "14px", color: "#6b7280" }}>
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <p
          style={{
            backgroundColor: "#f3f4f6",
            padding: "12px",
            borderRadius: "6px",
            fontSize: "13px",
            wordBreak: "break-all" as const,
            color: "#0052a1",
          }}
        >
          {data.resetUrl}
        </p>
      </div>

      {/* Security Note */}
      <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" }}>
        <p style={{ ...paragraphStyle, fontSize: "13px", color: "#6b7280" }}>
          <strong>Security Tips:</strong>
        </p>
        <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#6b7280" }}>
          <li style={{ marginBottom: "8px" }}>Never share your password with anyone</li>
          <li style={{ marginBottom: "8px" }}>Use a unique password for each online account</li>
          <li>Enable two-factor authentication for extra security</li>
        </ul>
      </div>

      {/* Help */}
      <p style={{ ...paragraphStyle, fontSize: "14px", color: "#6b7280", marginTop: "30px" }}>
        Need help? Contact us at{" "}
        <a href="mailto:support@pricesmart.com" style={{ color: "#0052a1" }}>
          support@pricesmart.com
        </a>
      </p>
    </EmailLayout>
  );
}

/**
 * Render email to HTML string
 */
export function renderPasswordResetEmail(data: PasswordResetEmailData): string {
  const ReactDOMServer = require("react-dom/server");
  return ReactDOMServer.renderToStaticMarkup(<PasswordResetEmail data={data} />);
}
