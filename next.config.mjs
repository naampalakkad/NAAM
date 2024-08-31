import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const withPWA = withPWAInit({
  dest: "public",
  cacheStartUrl: true,
  // Simplified runtime caching strategies
  workboxOptions: {
    runtimeCaching: [
      {
        // Caching strategy for all images
        urlPattern: /.*\.(png|jpg|jpeg|svg|gif|webp)$/,
        handler: "CacheFirst", // Prioritize cached content
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          },
        },
      },
      {
        // Caching strategy for Firebase Realtime Database requests
        urlPattern: /^https:\/\/naam-751a5-default-rtdb\.asia-southeast1\.firebasedatabase\.app\/.*$/,
        handler: "StaleWhileRevalidate", // Serve cached content, then update in the background
        options: {
          cacheName: "firebase-database",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
        },
      },
      {
        // Caching strategy for HTML and other documents
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "StaleWhileRevalidate", // Serve cached content, then update in the background
        options: {
          cacheName: "documents",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
          },
        },
      },
    ],
  },
});

export default withPWA({
  images: {
    remotePatterns: [
      {
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
});
