const path = require("path");
const { resolve } = require("path");
const { FileAuthorPlugin } = require("./src/plugin/file-author-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: resolve(__dirname, "src/index.js"),
    secondary: resolve(__dirname, "src/secondary.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new FileAuthorPlugin({
      author: "Some author",
      test: /\.js$/,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
