import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle the seeded SQLite file so Vercel serverless can read CMS content
  outputFileTracingIncludes: {
    "/*": ["./prisma/deploy.db", "./prisma/schema.prisma"],
  },
};

export default nextConfig;
