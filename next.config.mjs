/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'app.administracionyfinanzas.morelos.gob.mx',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
}

export default nextConfig
