import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                hostname: "family-record-api.dharmzeey.com",
            }
        ]
    },
   
};

export default nextConfig;
