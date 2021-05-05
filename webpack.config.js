const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function recursiveIssuer(m, c) {
  const issuer = c.moduleGraph.getIssuer(m);
  // For webpack@4 issuer = m.issuer

  if (issuer) {
    return recursiveIssuer(issuer, c);
  }

  const chunks = c.chunkGraph.getModuleChunks(m);
  // For webpack@4 chunks = m._chunks

  for (const chunk of chunks) {
    return chunk.name;
  }

  return false;
}

module.exports = {
  mode: "development",
  entry: { main: "./src/index.js", test: "./src/test.scss" },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        testStyles: {
          name: "test",
          test: (m, c, entry = "test") =>
            m.constructor.name === "CssModule" &&
            recursiveIssuer(m, c) === entry,
          chunks: "all",
          enforce: true,
        },
        indexStyles: {
          name: "main",
          test: (m, c, entry = "main") =>
            m.constructor.name === "CssModule" &&
            recursiveIssuer(m, c) === entry,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  output: {
    // filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
