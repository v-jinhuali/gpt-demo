import webpackDevServer from "webpack-dev-server";
import history from "connect-history-api-fallback";
import { PORT } from "./env";

const devServer: webpackDevServer.Configuration = {
  port: PORT,
  open: false,
  hot: true, 
  setupMiddlewares: function (middlewares, devServer) {
    if (!devServer) {
      throw new Error("webpack-dev-server is not defined");
    }
    middlewares.unshift(history({ index: "/html/index.html" }));
    return middlewares;
  },
};

export default devServer;
