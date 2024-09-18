/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: process.env.NODE_ENV === 'production' 
          ? ['tu-dominio-de-vercel-blob.com']
          : [],
    },
}

module.exports = nextConfig