/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Type errors reported in editor but won't fail the Vercel build
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint errors won't fail the build either
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ndfqysbzwckegfrmrgan.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}
module.exports = nextConfig
