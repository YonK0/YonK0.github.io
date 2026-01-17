/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/yonko.github.io',
  assetPrefix: '/yonko.github.io/',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
