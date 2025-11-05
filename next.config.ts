import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
    // Tell Next.js to include these packages in the standalone build
    outputFileTracingIncludes: {
      '/': ['./node_modules/@libsql/**/*'],
    },
};

export default nextConfig;
