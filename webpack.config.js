const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // fallback: {
    //     "crypto": require.resolve("crypto-browserify"),
    //     "stream": require.resolve("stream-browserify"),
    //     "buffer": require.resolve("buffer/"),
    //     "fs": require.resolve("browserify-fs"),
    //     "readline": require.resolve("readline-browser"),
    //     "util": require.resolve("util/"),
    //     "path": require.resolve("path-browserify")
    // }
  },
  output: {
    filename: '[name].js',
    path: path.join(os.tmpdir(), '_karma_webpack_') + Math.floor(Math.random() * 1000000),
  },
  // output: {
  //   filename: 'index.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ],
};