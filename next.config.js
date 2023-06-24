/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  reactStrictMode: true,
  eslint: {
    dirs: [
      'src',
      'prisma',
      'types',
    ],
  },
}

module.exports = nextConfig
