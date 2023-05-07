/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/u/**',
			},
		],
	},
};

module.exports = nextConfig;
