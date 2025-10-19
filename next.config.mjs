/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '1000000mb',
        },
    },
    output: "export",
}

export default nextConfig
