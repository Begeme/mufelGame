/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Activa el modo estricto de React
  experimental: {
    appDir: true, // Asegura que Next.js use el App Router si estás en la carpeta `/app`
  },
  images: {
    domains: ['example.com'], // Agrega dominios permitidos si cargas imágenes externas
  },
  eslint: {
    ignoreDuringBuilds: true, // Evita que errores de ESLint bloqueen la construcción
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }; // Evita errores con módulos de Node.js
    return config;
  },
};

module.exports = nextConfig;
