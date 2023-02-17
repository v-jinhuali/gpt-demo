import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { isDev } from "./env";

// 复用样式处理 loader
const commonCssLoader = [
  isDev ? "style-loader" : MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      modules: {
        auto: (resourcePath: string) => !resourcePath.includes("node_modules"),
        localIdentName: "_[local]__[hash:base64:5]"
      }
    }
  },
  "postcss-loader" 
];

const module: webpack.Configuration["module"] = {
  rules: [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader", 
      options: {
        presets: [],
        plugins: [isDev && "react-refresh/babel"].filter(Boolean),
        configFile: "./build-scripts/babel-config.js"
      }
    },
    {
      test: /\.css$/,
      // exclude: /node_modules/,
      use: [...commonCssLoader]
    },
    {
      test: /\.less$/,
      // exclude: /node_modules/,
      use: [
        ...commonCssLoader,
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      ]
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      type: "asset",
      parser: {
        dataUrlCondition: {
          maxSize: 5 * 1024 // 4kb
        }
      },
      generator: {
        // outputPath: "./assets/img",
        filename: "assets/imgs/[name]_[contenthash:5][ext]"
        // publicPath: "/assets/imgs/",
      }
    },
    {
      test: /\.(ttf)$/,
      type: "asset/resource",
      generator: {
        // outputPath: "./assets/fonts",
        filename: "assets/fonts/[name]_[contenthash:8][ext]"
        // publicPath: "/assets/fonts/",
      }
    }
  ]
};

export default module;
