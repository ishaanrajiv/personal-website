import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // The blog is off the site for now. Its old addresses go home rather than to a 404.
  async redirects() {
    return [
      { source: '/blog', destination: '/', permanent: false },
      { source: '/blog/:slug*', destination: '/', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
