/** @type {import('next').NextConfig} */

const nextConfig = {
  // ...rest of options
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
