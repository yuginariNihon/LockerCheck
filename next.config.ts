import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=()",
  },
];

// CSP สำหรับ production (ปลอดภัย + Compatible กับ Next.js)
const prodCsp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://script.google.com https://script.googleusercontent.com;
  font-src 'self';
`.replace(/\n/g, "");

// CSP สำหรับ development (ต้อง allow inline + eval)
const devCsp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://script.google.com https://script.googleusercontent.com;
  font-src 'self';
`.replace(/\n/g, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...securityHeaders,
          {
            key: "Content-Security-Policy",
            value: process.env.NODE_ENV === "development" ? devCsp : prodCsp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
