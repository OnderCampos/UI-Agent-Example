/**
 * Email Layout Component
 * Shared layout for all email templates
 */

import * as React from "react";

interface EmailLayoutProps {
  children: React.ReactNode;
  preview?: string;
}

export function EmailLayout({ children, preview }: EmailLayoutProps) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        {preview && <title>{preview}</title>}
        <style>{emailStyles}</style>
      </head>
      <body style={bodyStyle}>
        {/* Preview text (hidden) */}
        {preview && (
          <div style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>
            {preview}
          </div>
        )}

        {/* Main container */}
        <table
          role="presentation"
          style={{ width: "100%", backgroundColor: "#f5f5f5" }}
          cellPadding={0}
          cellSpacing={0}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: "40px 0" }}>
                {/* Content container */}
                <table
                  role="presentation"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                  cellPadding={0}
                  cellSpacing={0}
                >
                  <tbody>
                    {/* Header */}
                    <tr>
                      <td style={headerStyle}>
                        <table role="presentation" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td>
                                <span style={logoStyle}>
                                  Price<span style={{ color: "#f5a623" }}>Smart</span>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Body */}
                    <tr>
                      <td style={contentStyle}>{children}</td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td style={footerStyle}>
                        <p style={footerTextStyle}>
                          PriceSmart, Inc.
                          <br />
                          123 Commerce St, San Jose, Costa Rica
                        </p>
                        <p style={footerLinksStyle}>
                          <a href="https://pricesmart.com" style={footerLinkStyle}>
                            Website
                          </a>
                          {" | "}
                          <a href="https://pricesmart.com/help" style={footerLinkStyle}>
                            Help Center
                          </a>
                          {" | "}
                          <a href="https://pricesmart.com/stores" style={footerLinkStyle}>
                            Find a Store
                          </a>
                        </p>
                        <p style={copyrightStyle}>
                          &copy; {new Date().getFullYear()} PriceSmart. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

// Styles
const emailStyles = `
  @media only screen and (max-width: 600px) {
    .email-container {
      width: 100% !important;
      padding: 20px !important;
    }
  }
`;

const bodyStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: "16px",
  lineHeight: 1.5,
  color: "#333333",
  backgroundColor: "#f5f5f5",
};

const headerStyle: React.CSSProperties = {
  padding: "30px 40px",
  backgroundColor: "#0052a1",
  borderRadius: "8px 8px 0 0",
};

const logoStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ffffff",
};

const contentStyle: React.CSSProperties = {
  padding: "40px",
};

const footerStyle: React.CSSProperties = {
  padding: "30px 40px",
  backgroundColor: "#f9fafb",
  borderRadius: "0 0 8px 8px",
  borderTop: "1px solid #e5e7eb",
};

const footerTextStyle: React.CSSProperties = {
  margin: "0 0 15px",
  fontSize: "13px",
  color: "#6b7280",
  textAlign: "center" as const,
};

const footerLinksStyle: React.CSSProperties = {
  margin: "0 0 15px",
  fontSize: "13px",
  textAlign: "center" as const,
};

const footerLinkStyle: React.CSSProperties = {
  color: "#0052a1",
  textDecoration: "none",
};

const copyrightStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center" as const,
};

// Shared component styles
export const buttonStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "14px 28px",
  backgroundColor: "#0052a1",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 600,
  textDecoration: "none",
  borderRadius: "6px",
  textAlign: "center" as const,
};

export const secondaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#f5a623",
};

export const headingStyle: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#111827",
};

export const subheadingStyle: React.CSSProperties = {
  margin: "0 0 15px",
  fontSize: "18px",
  fontWeight: 600,
  color: "#374151",
};

export const paragraphStyle: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: "16px",
  color: "#4b5563",
  lineHeight: 1.6,
};

export const dividerStyle: React.CSSProperties = {
  margin: "30px 0",
  borderTop: "1px solid #e5e7eb",
};

export const cardStyle: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  marginBottom: "20px",
};
