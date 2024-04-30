/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    async rewrites() {
        return [
            {
                source: '/register',
                destination: '/auth/register'
            },
            {
                source: '/login',
                destination: '/auth/login'
            },
            {
                source: '/lupapass',
                destination: '/auth/lupapass'
            },
            {
                source: '/ujian',
                destination: '/book/ujian'
            },
            
        ]
    },
    images: {
        domains: ['localhost:4021/'], // Tambahkan domain dari mana Anda mengambil gambar
        path:'/uploads/',
      },
    
}

module.exports = nextConfig
