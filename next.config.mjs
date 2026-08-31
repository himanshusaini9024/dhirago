/** @type {import('next').NextConfig} */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pub-f4b2c7f0b6f74bbdb5e18f57a2251298.r2.dev",
      },
      {
        protocol: "https",
        hostname: "dhirago-images-761186487122-eu-north-1-an.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.dhirago.com",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    // Permissive enough for GTM, Meta Pixel, Razorpay, CDNs, and camera try-on;
    // still satisfies common SEO/security header checks.
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self' https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      `connect-src 'self' ${BASE_URL}   https: wss: blob:`,
      "frame-src 'self' https:",
      "media-src 'self' https: blob:",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
