const path = require("path");
const webpackShellPlugin = require("webpack-shell-plugin");
const nodeExternals = require("webpack-node-externals");
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");

const clientConfig = {
  entry: "./src/client/index.tsx",
  devtool: "inline-source-map",
  mode: "production",
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "src", "server", "public", "js")
  },
  optimization: {
    minimize: true,
    minimizer: [new uglifyJsPlugin()]
  }
};

const serverConfig = {
  entry: "./src/server/server.ts",
  mode: "production",
  target: "node",
  externals: [nodeExternals(), "node_helper"],
  node: {
    __dirname: false
  },
  output: {
    path: path.resolve(__dirname, "src", "server"),
    filename: "server.bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpackShellPlugin({
      onBuildEnd: ["npm run-script nodemon"]
    })
  ]
};

module.exports = [clientConfig, serverConfig];
