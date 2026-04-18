/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep dev output separate so local `next build` runs do not invalidate
  // a live `next dev` session, but let Vercel use the standard `.next`
  // directory that its Next.js deployment pipeline expects.
  distDir:
    process.env.NODE_ENV === 'development'
      ? '.next-dev'
      : process.env.VERCEL
        ? '.next'
        : '.next-build',
};

module.exports = nextConfig;
