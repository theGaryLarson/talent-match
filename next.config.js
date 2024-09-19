/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
    // TODO: remove once Damien implements suspense and/or uses loading skeleton.
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com'
          },
          {
            protocol: 'https',
            hostname: 'careerservicesstorage.blob.core.windows.net'
          },
          {
            protocol: 'https',
            hostname: 'randomuser.me'
          },
        ],
      }
};

module.exports = nextConfig;
