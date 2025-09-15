import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("Https://images.dog.ceo/breeds/affenpinscher/**")],
	},
	/* config options here */
};

export default nextConfig;
