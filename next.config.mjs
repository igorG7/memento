/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["169.254.83.107"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
