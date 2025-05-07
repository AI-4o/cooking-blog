// next.config.mjs

import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,      // Enable React strict mode for improved error handling
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
  }
};

export default withPWA({
  dest: "public",         // destination directory for the PWA files
  disable: process.env.NODE_ENV === "development",        // disable PWA in the development environment
  register: true,         // register the PWA service worker
  skipWaiting: true,      // skip waiting for service worker activation
  runtimeCaching: [ // each element is a caching strategy for different content 
    {
      urlPattern: /^https:\/\/your-api-domain\.com\/api/, //  Defines which URLs the caching rule applies to, can use callbacks or regex
      handler: 'CacheOnly', // caching strategy 
      options: {
        cacheName: 'api-cache', // set a name for this caching storage 
        expiration: { // set expiration for this cache and size
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        },
      }
    },
    {
      urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        plugins: []
      }
    },
    // Add more route-specific caching strategies
  ],
})(nextConfig);
