const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const applicationConfig = require("./config/admin.js")
const applicationText = require(`./locales/${applicationConfig.language}.json`)
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/admin/client/index.tsx"),
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "redux-thunk",
      "react-router-dom",
      "react-dropzone",
      "redux",
      "redux-form",
      "redux-form-material-ui",
      "material-ui",
    ],
  },

  performance: {
    hints: false,
  },

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "public"),
    filename: "admin-assets/js/[name]-[chunkhash].js",
    chunkFilename: "admin-assets/js/[name]-[chunkhash].js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor",
          enforce: true,
        },
      },
    },
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "src/admin/client"),
      routes: path.resolve(__dirname, "src/admin/client/routes"),
      modules: path.resolve(__dirname, "src/admin/client/modules"),
      lib: path.resolve(__dirname, "src/admin/client/lib"),
    },
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            use: {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                ignoreDiagnostics: [
                  2339,
                  2322,
                  2769,
                  2345,
                  2554,
                  2304,
                  2552,
                  2305,
                  2739,
                  2559,
                  2741,
                ],
              },
            },
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            include: [path.resolve(__dirname, "public")],
            exclude: [path.resolve(__dirname, "src")],
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
            test: /\.css$/,
            exclude: [path.resolve(__dirname, "node_modules|public")],
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  importLoaders: true,
                  // localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              },
              "postcss-loader",
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
            test: /\.module\.s[ac]ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  sourceMap: true,
                  minimize: true,
                },
              },
              "postcss-loader",
              "sass-loader",
            ],
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve("public/admin-assets/js/app-*.js"),
        path.resolve("public/admin-assets/js/vendor-*.js"),
        path.resolve("public/admin-assets/css/bundle-*.css"),
      ],
    }),
    // new ForkTsCheckerWebpackPlugin({
    //   async: true,
    //   typescript: {
    //     enabled: false,
    //     diagnosticOptions: {
    //       declaration: false,
    //       global: true,
    //       semantic: true,
    //       syntactic: true,
    //     },
    //   },
    // }),
    new webpack.DefinePlugin({
      APPLICATION_CONFIG: JSON.stringify(applicationConfig),
    }),
    new webpack.DefinePlugin({
      APPLICATION_TEXT: JSON.stringify(applicationText),
    }),
    new MiniCssExtractPlugin({
      filename: "admin-assets/css/bundle-[contenthash].css",
      chunkFilename: "admin-assets/css/bundle-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "src/admin/client/index.html",
      language: applicationConfig.language,
      inject: "body",
      filename: "admin/index.html",
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
