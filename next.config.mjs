/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "authartic-bucket.sfo3.digitaloceanspaces.com",
      "flagcdn.com",
    ],
  },
};

export default nextConfig;
