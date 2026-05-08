import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const remotePatterns: RemotePattern[] = [
  ...[1, 2, 3, 4, 5, 6].map<RemotePattern>(variant => ({
    protocol: "https",
    hostname: `lh${variant}.googleusercontent.com`,
    pathname: "/**",
  })),
  { protocol: "https", hostname: "ssl.pstatic.net", pathname: "/**" },
  { protocol: "https", hostname: "phinf.pstatic.net", pathname: "/**" },
  { protocol: "https", hostname: "k.kakaocdn.net", pathname: "/**" },
  { protocol: "https", hostname: "t1.kakaocdn.net", pathname: "/**" },
  { protocol: "http", hostname: "k.kakaocdn.net", pathname: "/**" },
  { protocol: "http", hostname: "t1.kakaocdn.net", pathname: "/**" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
