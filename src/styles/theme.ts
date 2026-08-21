/**
 * PriceSmart Design Tokens
 * Based on https://www.pricesmart.com/en-CR
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    50: "#e6f0ff",
    100: "#cce0ff",
    200: "#99c2ff",
    300: "#66a3ff",
    400: "#3385ff",
    500: "#0066ff", // Main brand blue
    600: "#0052cc",
    700: "#003d99", // Header/nav blue
    800: "#002966",
    900: "#001433",
  },
  
  // PriceSmart specific blues
  pricesmart: {
    blue: "#0052a1", // Main header blue
    darkBlue: "#003d7a", // Navigation bar
    lightBlue: "#e6f3ff", // Backgrounds
    navy: "#001f4d", // Footer
  },

  // Accent Colors (Amber/Gold)
  accent: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24", // Main amber
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  // Neutral Colors
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },

  // Semantic Colors
  success: {
    light: "#dcfce7",
    main: "#22c55e",
    dark: "#15803d",
  },
  warning: {
    light: "#fef3c7",
    main: "#f59e0b",
    dark: "#b45309",
  },
  error: {
    light: "#fee2e2",
    main: "#ef4444",
    dark: "#b91c1c",
  },
  info: {
    light: "#dbeafe",
    main: "#3b82f6",
    dark: "#1d4ed8",
  },
};

export const typography = {
  fontFamily: {
    sans: '"Inter", "Helvetica Neue", Arial, sans-serif',
    display: '"Inter", "Helvetica Neue", Arial, sans-serif',
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
};

export const borderRadius = {
  none: "0",
  sm: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
};

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
};

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// CSS Custom Properties for runtime theming
export const cssVariables = `
  :root {
    --color-primary: ${colors.pricesmart.blue};
    --color-primary-dark: ${colors.pricesmart.darkBlue};
    --color-primary-light: ${colors.pricesmart.lightBlue};
    --color-accent: ${colors.accent[400]};
    --color-accent-dark: ${colors.accent[600]};
    --color-background: ${colors.neutral[50]};
    --color-surface: #ffffff;
    --color-text-primary: ${colors.neutral[900]};
    --color-text-secondary: ${colors.neutral[600]};
    --color-text-muted: ${colors.neutral[400]};
    --color-border: ${colors.neutral[200]};
    --font-family: ${typography.fontFamily.sans};
    --shadow-sm: ${shadows.sm};
    --shadow-md: ${shadows.md};
    --shadow-lg: ${shadows.lg};
  }
`;

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
};
