/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep dev and production outputs separate so local `next build`
  // runs do not invalidate a live `next dev` session.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next-build',
};

module.exports = nextConfig;
