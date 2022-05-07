const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve("./src"),
    };
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
