export const APP_CONFIG = {
  name: "Savan Patel — Founder & Product Engineer",
  shortName: "Savan Patel",
  version: "1.0.0",
  buildId: process.env.NEXT_PUBLIC_BUILD_ID || "dev",

  url: "https://savan.sp-net.in",
  organizationUrl: "https://sp-net.in",

  organization: {
    name: "SP NET INC",
    shortName: "SP NET",
  },

  founder: {
    name: "Savan Patel",
    email: "savan@sp-net.in",
  },
} as const;
