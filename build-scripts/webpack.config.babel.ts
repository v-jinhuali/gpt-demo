import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";

import { NODE_ENV, absolutePath } from "./env";
import output from "./output";
import resolve from "./resolve";
import module from "./module";
import plugins from "./plugins";
import optimization from "./optimization";
import devServer from "./dev-server";

const webpackConfig: webpack.Configuration & {
  devServer: webpackDevServer.Configuration;
} = {
  mode: NODE_ENV, 
  entry: { app: absolutePath("./src/index.ts") }, 
  output,
  resolve,
  module,
  plugins,
  optimization,
  devServer
  // devtool: "source-map",
};

export default webpackConfig;
