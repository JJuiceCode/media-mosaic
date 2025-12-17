import type { NextConfig } from "next";

const googleAvatarHosts = [3, 4, 5, 6].map(variant => ({
  protocol: "https",
  hostname: `lh${variant}.googleusercontent.com`,
}));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: googleAvatarHosts,
  },
};

export default nextConfig;
