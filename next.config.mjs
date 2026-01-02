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
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  // Rewrites para rutas traducidas (sin prefijo de idioma)
  async rewrites() {
    return [
      // Rutas en Español
      { source: '/nosotros', destination: '/about' },
      { source: '/servicios', destination: '/services' },
      { source: '/cumplimiento', destination: '/compliance' },
      { source: '/calidad', destination: '/quality' },
      { source: '/galeria', destination: '/gallery' },
      { source: '/noticias', destination: '/blog' },
      { source: '/noticias/:slug', destination: '/blog/:slug' },
      { source: '/contacto', destination: '/contact' },
      { source: '/privacidad', destination: '/privacy' },
      { source: '/terminos', destination: '/terms' },
      
      // Rutas en Chino (pinyin)
      { source: '/guanyu', destination: '/about' },
      { source: '/fuwu', destination: '/services' },
      { source: '/heguixing', destination: '/compliance' },
      { source: '/zhiliang', destination: '/quality' },
      { source: '/tuku', destination: '/gallery' },
      { source: '/xinwen', destination: '/blog' },
      { source: '/xinwen/:slug', destination: '/blog/:slug' },
      { source: '/lianxi', destination: '/contact' },
      { source: '/yinsi', destination: '/privacy' },
      { source: '/tiaokuan', destination: '/terms' },
      { source: '/falv', destination: '/legal' },
    ]
  },
}

export default nextConfig
