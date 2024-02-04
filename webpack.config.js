const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scanword.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"]
    }
  },
  module: {
    rules: [
      { test: /\.html$/i, loader: "html-loader" },
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
  ]
};
