const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const WebpackConfig = require("../webpack.dev.js");

const server = new WebpackDevServer(WebpackConfig.devServer, Webpack(WebpackConfig));

(async () => {
  const server = new WebpackDevServer(WebpackConfig.devServer, Webpack(WebpackConfig));

  try {
    await server.start();

    if (process.send) {
      process.send('ok');
    }
  } catch (err) {
    process.exit(1);
  }
})();