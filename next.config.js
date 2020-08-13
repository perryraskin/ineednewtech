const dotenv = require("dotenv-webpack")

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new dotenv({ silent: true }))
    config.module.rules.push({ parser: { amd: false } })
    if (!isServer) {
      config.node = {
        fs: "empty"
      }
    }

    return config
  }
}
