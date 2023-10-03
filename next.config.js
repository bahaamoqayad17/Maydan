/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_NAME: "Maydan",
    API_URL: "http://localhost:4040/api/",
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
