const path = require("path"),
  merge = require("webpack-merge"),
  common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
    disableHostCheck: true
  }
});
