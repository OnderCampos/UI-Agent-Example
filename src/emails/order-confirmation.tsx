/**
 * Order Confirmation Email Template
 */

import {
  EmailLayout,
  buttonStyle,
  headingStyle,
  paragraphStyle,
  dividerStyle,
  cardStyle,
  subheadingStyle,
} from "./components/email-layout";
import type { OrderConfirmationEmailData } from "@/integrations/external-apis/notifications/types";

interface OrderConfirmationEmailProps {
  data: OrderConfirmationEmailData;
}

export function OrderConfirmationEmail({ data }: OrderConfirmationEmailProps) {
  return (
    <EmailLayout preview={`Order Confirmed: #${data.orderNumber}`}>
      {/* Header */}
      <h1 style={headingStyle}>Thank you for your order!</h1>
      <p style={paragraphStyle}>
        Hi {data.customerName}, your order has been confirmed and is being processed.
      </p>

      {/* Order Info Card */}
      <div style={cardStyle}>
        <table role="presentation" style={{ width: "100%" }} cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td>
                <strong style={{ color: "#6b7280", fontSize: "14px" }}>ORDER NUMBER</strong>
                <br />
                <span style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
                  #{data.orderNumber}
                </span>
              </td>
              {data.estimatedDelivery && (
                <td style={{ textAlign: "right" as const }}>
                  <strong style={{ color: "#6b7280", fontSize: "14px" }}>ESTIMATED DELIVERY</strong>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
                    {data.estimatedDelivery}
                  </span>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Track Order Button */}
      {data.trackingUrl && (
        <div style={{ textAlign: "center" as const, marginBottom: "30px" }}>
          <a href={data.trackingUrl} style={buttonStyle}>
            Track Your Order
          </a>
        </div>
      )}

      <div style={dividerStyle} />

      {/* Order Items */}
      <h2 style={subheadingStyle}>Order Summary</h2>
      <table role="presentation" style={{ width: "100%", marginBottom: "20px" }} cellPadding={0} cellSpacing={0}>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "15px 0", borderBottom: "1px solid #e5e7eb" }}>
                <table role="presentation" style={{ width: "100%" }} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      {item.image && (
                        <td style={{ width: "60px", paddingRight: "15px" }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover" as const,
                              borderRadius: "6px",
                            }}
                          />
                        </td>
                      )}
                      <td>
                        <strong style={{ color: "#111827" }}>{item.name}</strong>
                        <br />
                        <span style={{ color: "#6b7280", fontSize: "14px" }}>
                          Qty: {item.quantity}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" as const, fontWeight: 600 }}>
                        {item.price}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Totals */}
      <table role="presentation" style={{ width: "100%", marginBottom: "30px" }} cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280" }}>Subtotal</td>
            <td style={{ padding: "8px 0", textAlign: "right" as const }}>{data.subtotal}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280" }}>Shipping</td>
            <td style={{ padding: "8px 0", textAlign: "right" as const }}>{data.shipping}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280" }}>Tax</td>
            <td style={{ padding: "8px 0", textAlign: "right" as const }}>{data.tax}</td>
          </tr>
          <tr>
            <td style={{ padding: "15px 0", fontWeight: "bold", fontSize: "18px", borderTop: "2px solid #e5e7eb" }}>
              Total
            </td>
            <td style={{ padding: "15px 0", textAlign: "right" as const, fontWeight: "bold", fontSize: "18px", borderTop: "2px solid #e5e7eb" }}>
              {data.total}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={dividerStyle} />

      {/* Shipping Address */}
      <h2 style={subheadingStyle}>Shipping Address</h2>
      <div style={{ ...cardStyle, marginBottom: "30px" }}>
        <p style={{ margin: 0, lineHeight: 1.8 }}>
          <strong>{data.shippingAddress.name}</strong>
          <br />
          {data.shippingAddress.street}
          <br />
          {data.shippingAddress.city}, {data.shippingAddress.state} {data.shippingAddress.postalCode}
          <br />
          {data.shippingAddress.country}
        </p>
      </div>

      {/* Help Section */}
      <p style={{ ...paragraphStyle, fontSize: "14px", color: "#6b7280" }}>
        Questions about your order? Visit our{" "}
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
export function renderOrderConfirmationEmail(data: OrderConfirmationEmailData): string {
  const ReactDOMServer = require("react-dom/server");
  return ReactDOMServer.renderToStaticMarkup(<OrderConfirmationEmail data={data} />);
}
