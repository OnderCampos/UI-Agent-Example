/**
 * Welcome Email Template
 */

import {
  EmailLayout,
  buttonStyle,
  secondaryButtonStyle,
  headingStyle,
  paragraphStyle,
  dividerStyle,
  cardStyle,
  subheadingStyle,
} from "./components/email-layout";
import type { WelcomeEmailData } from "@/integrations/external-apis/notifications/types";

interface WelcomeEmailProps {
  data: WelcomeEmailData;
}

export function WelcomeEmail({ data }: WelcomeEmailProps) {
  return (
    <EmailLayout preview="Welcome to PriceSmart!">
      {/* Welcome Header */}
      <div style={{ textAlign: "center" as const, marginBottom: "30px" }}>
        <h1 style={{ ...headingStyle, fontSize: "28px", marginBottom: "10px" }}>
          Welcome to PriceSmart!
        </h1>
        <p style={{ ...paragraphStyle, fontSize: "18px", color: "#4b5563" }}>
          Hi {data.customerName}, we're excited to have you as a member.
        </p>
      </div>

      {/* Membership Card Preview */}
      {data.memberId && (
        <div
          style={{
            background: "linear-gradient(135deg, #0052a1 0%, #003d7a 100%)",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "30px",
            color: "#ffffff",
          }}
        >
          <table role="presentation" style={{ width: "100%" }} cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                <td>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Price<span style={{ color: "#f5a623" }}>Smart</span>
                  </span>
                  {data.membershipType && (
                    <span
                      style={{
                        marginLeft: "10px",
                        padding: "4px 10px",
                        backgroundColor: "#f5a623",
                        color: "#003d7a",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "4px",
                      }}
                    >
                      {data.membershipType.toUpperCase()}
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "20px" }}>
                  <span style={{ fontSize: "12px", opacity: 0.8 }}>MEMBER ID</span>
                  <br />
                  <span style={{ fontSize: "22px", fontFamily: "monospace", letterSpacing: "2px" }}>
                    {data.memberId}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "15px" }}>
                  <span style={{ fontSize: "16px" }}>{data.customerName}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Verify Email Button */}
      {data.verifyUrl && (
        <>
          <div style={{ textAlign: "center" as const, marginBottom: "30px" }}>
            <p style={paragraphStyle}>
              Please verify your email address to activate all member benefits:
            </p>
            <a href={data.verifyUrl} style={buttonStyle}>
              Verify Email Address
            </a>
          </div>
          <div style={dividerStyle} />
        </>
      )}

      {/* What's Next */}
      <h2 style={subheadingStyle}>What's Next?</h2>
      <div style={{ marginBottom: "30px" }}>
        <div style={{ ...cardStyle, marginBottom: "15px" }}>
          <table role="presentation" cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                <td style={{ width: "50px", verticalAlign: "top" }}>
                  <span style={{ fontSize: "24px" }}>🛒</span>
                </td>
                <td>
                  <strong style={{ color: "#111827" }}>Start Shopping</strong>
                  <p style={{ margin: "5px 0 0", fontSize: "14px", color: "#6b7280" }}>
                    Browse our selection of quality products at wholesale prices.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ ...cardStyle, marginBottom: "15px" }}>
          <table role="presentation" cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                <td style={{ width: "50px", verticalAlign: "top" }}>
                  <span style={{ fontSize: "24px" }}>📱</span>
                </td>
                <td>
                  <strong style={{ color: "#111827" }}>Download Our App</strong>
                  <p style={{ margin: "5px 0 0", fontSize: "14px", color: "#6b7280" }}>
                    Shop on the go and access your digital membership card.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={cardStyle}>
          <table role="presentation" cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                <td style={{ width: "50px", verticalAlign: "top" }}>
                  <span style={{ fontSize: "24px" }}>📍</span>
                </td>
                <td>
                  <strong style={{ color: "#111827" }}>Visit a Club</strong>
                  <p style={{ margin: "5px 0 0", fontSize: "14px", color: "#6b7280" }}>
                    Find your nearest PriceSmart location and experience our clubs in person.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Buttons */}
      <div style={{ textAlign: "center" as const }}>
        <a href="https://pricesmart.com/products" style={{ ...secondaryButtonStyle, marginRight: "10px" }}>
          Shop Now
        </a>
        <a href="https://pricesmart.com/stores" style={{ ...buttonStyle, backgroundColor: "#374151" }}>
          Find a Store
        </a>
      </div>

      <div style={dividerStyle} />

      {/* Member Benefits */}
      <h2 style={subheadingStyle}>Your Member Benefits</h2>
      <ul style={{ paddingLeft: "20px", color: "#4b5563", lineHeight: 2 }}>
        <li>Access to wholesale prices on thousands of products</li>
        <li>Member-exclusive promotions and deals</li>
        <li>Online shopping with delivery or club pickup</li>
        <li>Earn and redeem points on purchases</li>
        <li>Early access to special events and sales</li>
      </ul>

      {/* Help */}
      <p style={{ ...paragraphStyle, fontSize: "14px", color: "#6b7280", marginTop: "30px" }}>
        Have questions? Visit our{" "}
        <a href="https://pricesmart.com/help" style={{ color: "#0052a1" }}>
          Help Center
        </a>{" "}
        or contact us at{" "}
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
export function renderWelcomeEmail(data: WelcomeEmailData): string {
  const ReactDOMServer = require("react-dom/server");
  return ReactDOMServer.renderToStaticMarkup(<WelcomeEmail data={data} />);
}
