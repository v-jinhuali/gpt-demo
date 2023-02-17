import webpack from "webpack";
import { absolutePath } from "./env";

const resolve: webpack.Configuration["resolve"] = {
  alias: {
    "@": absolutePath("./src"),
  },
  enforceExtension: false, 
  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"], 
  mainFiles: ["yyy", "xxx", "index"], 
  mainFields: ["browser", "module", "main"], 
  modules: ["node_modules"] 
};

export default resolve;
