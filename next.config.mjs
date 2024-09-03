//  run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
await import("./src/env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias.canvas = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        // linkedin oauth profile images
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        // google oauth profile images
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        // ah2 cloudflare cdn
        protocol: "https",
        hostname: "cdn.advanceh2.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/ph/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/api/ph/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/api/ph/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  skipTrailingSlashRedirect: true, // required for posthog proxy
  experimental: {
    /**
     * KLUDGE: router cache (client-side) has it's own rules for when to send requests to server.
     * this messes up auth that needs to be validated when switching between pages with user interactions.
     * setting to 0 for dynamic routes and 60sec for static.
     *
     * https://nextjs.org/docs/app/building-your-application/caching#router-cache
     * https://github.com/vercel/next.js/issues/49300#issuecomment-2106080479
     *
     * This config can be used to override the cache behavior for the client router.
     * These values indicate the time, in seconds, that the cache should be considered reusable.
     * When the prefetch Link prop is left unspecified, this will use the dynamic value.
     * When the prefetch Link prop is set to true, this will use the static value.
     */
    staleTimes: {
      dynamic: 0,
      static: 60,
    },
  },
};

export default nextConfig;
