/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
          : '/api/:path*',
      },
      {
        source: '/api/auth/facebook/callback',
        destination: '/api/auth/facebook/callback',
      },
    ];
  },
};

export default nextConfig;
