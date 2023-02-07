/* eslint-disable import/no-commonjs */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // TODO: can re-enable once react-player is updated
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
