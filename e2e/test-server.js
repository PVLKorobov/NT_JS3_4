const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const WebpackConfig = require("../webpack.dev.js");

// class DevServerWrapper {
//     constructor () {
//         this.compiler = Webpack(WebpackConfig);
//         this.devServerConfig = { ...WebpackConfig.devServer };
//         this.server = null;
//     }

//     // const server = new WebpackDevServer(devServerConfig, compiler);

//     makeServer() {
//         return new Promise((resolve, reject) => {
//             let compiled = false;
//             let listening = false;

//             this.compiler.hooks.done.tap('a', () => {
//                 // console.log('compiled');

//                 if (listening) resolve(server);
//                 else compiled = true;
//             });

//             const server = new WebpackDevServer(this.compiler, this.devServerConfig);

//             server.listen(port, '0.0.0.0', err => {
//                 if (err) return reject(err);

//                 // console.log('listening');

//                 if (compiled) resolve(server);
//                 else listening = true;
//             });

//             return server;
//         });
//     }

//     async startServer () {
//         this.server = await this.makeServer();
//         await this.server.start();
//     };

//     async stopServer () {
//         await this.server.stop();
//     }
// }

// export { DevServerWrapper };

const compiler = Webpack(WebpackConfig);
const devServerConfig = { ...WebpackConfig.devServer };
const server = new WebpackDevServer(devServerConfig, compiler);

async function startServer() {
  await server.start();
}

async function stopServer() {
  await server.stop();
}

export { startServer, stopServer };
