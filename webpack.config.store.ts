// @ts-nocheck
const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { GenerateSW } = require("workbox-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const Dotenv = require("dotenv-webpack")

module.exports = {
  entry: {
    app: "./src/store/client/index.js",
    theme: ["theme"],
  },

  performance: {
    hints: false,
  },

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "theme"),
    filename: "assets/js/[name]-[chunkhash].js",
    chunkFilename: "assets/js/[name]-[chunkhash].js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "theme",
          test: "theme",
          enforce: true,
        },
      },
    },
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: { loader: "ts-loader", options: { transpileOnly: true } },
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"],
            plugins: ["transform-class-properties"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|otf|eot|png|svg|ttf|woff|woff2)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve("theme/assets/js/*-*.js"),
        // path.resolve("theme/dist/*"),
        path.resolve("theme/assets/sw.js"),
        path.resolve("theme/assets/workbox-*.js"),
      ],
    }),
    new Dotenv(),
    // new ForkTsCheckerWebpackPlugin({ async: true }),
    new MiniCssExtractPlugin({
      filename: "assets/css/bundle-[contenthash].css",
      chunkFilename: "assets/css/bundle-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "theme/index.html",
      inject: "body",
      filename: "assets/index.html",
    }),
    new GenerateSW({
      swDest: "assets/sw.js",
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.html$/],
      runtimeCaching: [
        {
          urlPattern: new RegExp("/(images|assets|admin-assets)/"),
          handler: "NetworkFirst",
        },
        {
          urlPattern: new RegExp("/api/"),
          handler: "NetworkOnly",
        },
        {
          urlPattern: new RegExp("/ajax/payment_form_settings"),
          handler: "NetworkOnly",
        },
        {
          urlPattern: new RegExp("/"),
          handler: "NetworkFirst",
          options: {
            networkTimeoutSeconds: 10,
          },
        },
      ],
    }),
    new webpack.BannerPlugin({
      banner: `Created: ${new Date().toUTCString()}`,
      raw: false,
      entryOnly: false,
    }),
  ],

  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
}
