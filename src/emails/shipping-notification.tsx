/**
 * Shipping Notification Email Template
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
import type { ShippingNotificationEmailData } from "@/integrations/external-apis/notifications/types";

interface ShippingNotificationEmailProps {
  data: ShippingNotificationEmailData;
}

export function ShippingNotificationEmail({ data }: ShippingNotificationEmailProps) {
  return (
    <EmailLayout preview={`Your order #${data.orderNumber} has shipped!`}>
      {/* Header with Icon */}
      <div style={{ textAlign: "center" as const, marginBottom: "30px" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#dcfce7",
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <span style={{ fontSize: "40px" }}>📦</span>
        </div>
        <h1 style={{ ...headingStyle, marginBottom: "10px" }}>Your order is on its way!</h1>
        <p style={{ ...paragraphStyle, marginBottom: 0 }}>
          Great news, {data.customerName}! Your package has been shipped.
        </p>
      </div>

      {/* Tracking Info Card */}
      <div style={{ ...cardStyle, backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}>
        <table role="presentation" style={{ width: "100%" }} cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td>
                <strong style={{ color: "#1e40af", fontSize: "14px" }}>TRACKING NUMBER</strong>
                <br />
                <span style={{ fontSize: "18px", fontWeight: 600, color: "#111827", fontFamily: "monospace" }}>
                  {data.trackingNumber}
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ paddingTop: "15px" }}>
                <strong style={{ color: "#1e40af", fontSize: "14px" }}>CARRIER</strong>
                <br />
                <span style={{ fontSize: "16px", color: "#111827" }}>{data.carrier}</span>
              </td>
            </tr>
            <tr>
              <td style={{ paddingTop: "15px" }}>
                <strong style={{ color: "#1e40af", fontSize: "14px" }}>ESTIMATED DELIVERY</strong>
                <br />
                <span style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
                  {data.estimatedDelivery}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Track Button */}
      <div style={{ textAlign: "center" as const, margin: "30px 0" }}>
        <a href={data.trackingUrl} style={buttonStyle}>
          Track Your Package
        </a>
      </div>

      <div style={dividerStyle} />

      {/* Items in Shipment */}
      <h2 style={subheadingStyle}>Items in This Shipment</h2>
      <table role="presentation" style={{ width: "100%", marginBottom: "30px" }} cellPadding={0} cellSpacing={0}>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "12px 0", borderBottom: index < data.items.length - 1 ? "1px solid #e5e7eb" : undefined }}>
                <table role="presentation" style={{ width: "100%" }} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      {item.image && (
                        <td style={{ width: "50px", paddingRight: "12px" }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover" as const,
                              borderRadius: "4px",
                            }}
                          />
                        </td>
                      )}
                      <td>
                        <span style={{ color: "#111827" }}>{item.name}</span>
                        <br />
                        <span style={{ color: "#6b7280", fontSize: "14px" }}>
                          Qty: {item.quantity}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={dividerStyle} />

      {/* Shipping Address */}
      <h2 style={subheadingStyle}>Delivering To</h2>
      <div style={cardStyle}>
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

      {/* Order Reference */}
      <p style={{ ...paragraphStyle, fontSize: "14px", color: "#6b7280", marginTop: "20px" }}>
        Order number: <strong>#{data.orderNumber}</strong>
      </p>
    </EmailLayout>
  );
}

/**
 * Render email to HTML string
 */
export function renderShippingNotificationEmail(data: ShippingNotificationEmailData): string {
  const ReactDOMServer = require("react-dom/server");
  return ReactDOMServer.renderToStaticMarkup(<ShippingNotificationEmail data={data} />);
}
