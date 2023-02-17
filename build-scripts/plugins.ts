import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { absolutePath, isProduction, isBundleAnalyze, isDev } from "./env";

const originalPlugins: (webpack.WebpackPluginInstance | false)[] = [
  new HtmlWebpackPlugin({
    template: absolutePath("./src/index.html"),
    filename: "html/index.html",
    minify: isProduction
      ? {
          removeComments: true, 
          collapseWhitespace: false, 
          keepClosingSlash: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      : false
  }),
  isProduction &&
    new MiniCssExtractPlugin({
      filename: "css/[name]_[chunkhash:8].css"
    }),
  isDev && new ReactRefreshWebpackPlugin(),
  new ProgressBarPlugin({
    total: 100,
    summary: true
  }) as unknown as webpack.WebpackPluginInstance,
  isBundleAnalyze && new BundleAnalyzerPlugin() 
];

const filterPlugins = originalPlugins.filter(Boolean) as webpack.Configuration["plugins"];

export default filterPlugins;
