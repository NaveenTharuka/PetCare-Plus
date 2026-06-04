/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xkoekzhihxqwrsvxvyiz.supabase.co",
      },
    ],
  },
};

export default nextConfig;