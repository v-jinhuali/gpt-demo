module.exports = {
  babelrc: false,
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "auto",
        targets: ["last 1 chrome version"]
      }
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic"
      }
    ],
    "@babel/preset-typescript"
  ]
};
