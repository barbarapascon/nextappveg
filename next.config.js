/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  webpack: (config, { isServer }) => {
   if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false
      };

   }

    return config;
  },
  
  // If you're using images, you might want to add the domains for external images
  images: {
    domains: [],  // Add your domains here like ['example.com']
  },
  
  // Additional configurations can go here...
};

module.exports = nextConfig;
