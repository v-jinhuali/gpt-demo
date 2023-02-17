import webpack from "webpack";
import { absolutePath, isProduction } from "./env";

const output: webpack.Configuration["output"] = {
  path: isProduction ? absolutePath("./build") : void 0,
  filename: isProduction ? "js/initial.[name].[contenthash:8].js" : "js/initial.[name].bundle.js",
  chunkFilename: isProduction ? "js/async.[name].[contenthash:8].js" : "js/async.[name].bundle.js",
  publicPath: "/", 
};

export default output;
