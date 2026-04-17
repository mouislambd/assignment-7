/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "**ibb.co.com" },
      { hostname: "**randomuser.me" },
      { hostname: "**randomuser.org" },
      { hostname: "**facebook.com" },
      { hostname: "**googleusercontent.com" },
    ],
  },
};

export default nextConfig;
