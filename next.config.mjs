/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16 uses Turbopack by default; keep an empty turbopack config
  // so a custom webpack block (if re-added for production builds) won't crash `next dev`.
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
};

export default nextConfig;
