const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  mode: 'development', // Can be overridden by CLI --mode production
  devtool: 'inline-source-map', // Source maps for easier debugging
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'), // Alias for src directory
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the output directory before each build
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve files from public
    },
    compress: true,
    port: 8080,
    open: true, // Open browser automatically
    hot: true, // Enable Hot Module Replacement
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use this as a template
      inject: 'body', // Inject script into the body
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/assets', // Source folder
          to: 'assets', // Destination folder in dist
          noErrorOnMissing: true, // Don't error if assets folder doesn't exist yet
        },
      ],
    }),
  ],
};
