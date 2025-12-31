/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Formatos modernos para mejor compresión
    formats: ['image/avif', 'image/webp'],
    // Tamaños optimizados para diferentes dispositivos
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Caché de 1 año para imágenes
    minimumCacheTTL: 31536000,
    // Permitir SVGs
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Calidad por defecto reducida para mejor performance
    unoptimized: false,
  },
  // Optimización de paquetes
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'leaflet', '@emailjs/browser'],
  },
  // Compilador optimizado
  compiler: {
    // Eliminar console.log en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Headers de caché agresivos para assets estáticos
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/brand/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Videos con caché largo
        source: '/images/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  // Redirecciones y rewrites si son necesarios
  async rewrites() {
    return []
  },
}

export default nextConfig
