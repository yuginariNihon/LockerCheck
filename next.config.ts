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
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

// CSP สำหรับ production (เข้มที่สุด)
const prodCsp = `
  default-src 'self';
  script-src 'self';
  style-src 'self';
  img-src 'self' data: https:;
  connect-src 'self' https://script.google.com https://script.googleusercontent.com;
  font-src 'self';
`.replace(/\n/g, "");

// CSP สำหรับ development (allow inline + eval เพื่อให้ dev bundle ทำงาน)
const devCsp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://script.google.com https://script.googleusercontent.com;
  font-src 'self';
`.replace(/\n/g, "");

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '',
      },
    ],
  },
  
  async headers() {
    return [
      {
        source: "/(.*)", // ทุกหน้าในเว็บ
        headers: [
          ...securityHeaders,
          {
            key: "Content-Security-Policy",
            value: process.env.NODE_ENV === "development" ? devCsp : prodCsp,
          }
        ],
      },
    ];
  },
};

export default nextConfig;
