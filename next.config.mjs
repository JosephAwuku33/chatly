/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'readymadeui.com',
            }
        ]
    }
};

export default nextConfig;
