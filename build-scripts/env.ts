import path from "path";

const processEnv = process.env as {
  NODE_ENV?: "development" | "production";
  BUNDLE_ANNALYZE?: "analysis";
};

const absolutePath = (relativePath: string) => path.resolve(process.cwd(), relativePath);

const { NODE_ENV = "production", BUNDLE_ANNALYZE } = processEnv;

const isDev = NODE_ENV === "development";
const isProduction = NODE_ENV === "production";
const isBundleAnalyze = isProduction && BUNDLE_ANNALYZE === "analysis";

export const shouldUseSourceMap = true;

export const PORT = process.env.port || 5001;

export { NODE_ENV, isDev, isProduction, isBundleAnalyze, absolutePath };
