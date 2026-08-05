/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

export default nextConfig;
