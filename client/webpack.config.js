const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  const plugins = [
    // 1
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["main"],
      filename: "index.html",
    }),
    isProduction &&
      new InjectManifest({
        swSrc: "./src-sw.js", // Path to your service worker file
        swDest: "src-sw.js",
      }),
    new WebpackPwaManifest({
      name: "Text Editor",
      short_name: "Text",
      description: "Edit your text",
      background_color: "#225ca3",
      theme_color: "#225ca3",
      icons: [
        {
          src: path.resolve("src/images/logo.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
      ],
    }),
  ];

  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: plugins,

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
