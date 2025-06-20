/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com", // optional if you're using Imgur images too
      },
    ],
  },
};

export default nextConfig;
