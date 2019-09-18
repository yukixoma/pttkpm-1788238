const path = require("path");
const webpackShellPlugin = require("webpack-shell-plugin");
const nodeExternals = require("webpack-node-externals");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const terserPlugin = require("terser-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

const clientConfig = {
  entry: "./src/client/index.tsx",
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
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "src/client/public/index.html"),
      filename: "index.html",
      inject: "body"
    }),
    new miniCssExtractPlugin({
      filename: "css/bundle.css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new webpackShellPlugin({
      onBuildEnd: ["npm run-script nodemon"]
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new terserPlugin({
        parallel: true
      }),
      new optimizeCssAssetsPlugin()
    ],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react"
        },
        reactRouterVendor: {
          test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
          name: "reactRouter"
        },
        bootstrapVendor: {
          test: /[\\/]node_modules[\\/](react-bootstrap)[\\/]/,
          name: "bootstrap"
        },
        vendor: {
          test: /[\\/]node_modules[\\/](!react-bootstrap)(!react-router)(!react-router-dom)(!react)(!react-dom)[\\/]/,
          name: "other"
        }
      }
    }
  },
  output: {
    filename: "js/main.bundle.js",
    chunkFilename: "vendor/[name].js",
    publicPath: "/",
    path: path.resolve(__dirname, "src/server/public")
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
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "src/server"),
    filename: "server.bundle.js"
  }
};

module.exports = [clientConfig, serverConfig];
