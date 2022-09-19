/** @type {import('next').NextConfig} */

const withPwa = require('next-pwa')({
  dest: 'public',
  register:true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = withPwa({
  reactStrictMode: true,
  images: {
    domains: [
      'publicdomainvectors.org',
      'images.pexels.com',
      'res.cloudinary.com',
      'pixnio.com',
      'i.pinimg.com',
    ],
  },
});

module.exports = nextConfig;
