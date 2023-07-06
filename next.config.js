/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects() {
    return [
      {
        source: "/posts",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
