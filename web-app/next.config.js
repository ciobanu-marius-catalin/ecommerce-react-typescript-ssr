const path = require('path');
const { readdirSync } = require('fs');
function resolve(dir) {
  return path.join(__dirname, dir);
}

const aliases = {};

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const directories = getDirectories('./src');

directories.forEach((directory) => {
  aliases[`@${directory}`] = resolve(`./src/${directory}`);
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases,
    };
    return config;
  },
};

module.exports = nextConfig;
