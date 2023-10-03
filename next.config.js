/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_NAME: "Maydan",
    API_URL: "http://ewavechart.com:4041/api/",
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
