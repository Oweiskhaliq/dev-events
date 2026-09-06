import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
         port: "", // Leave empty for standard https ports
        pathname: "/**", // Allows access to all image subfolders on your account
    
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
