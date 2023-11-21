const { resolve } = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtReloader = require('webpack-ext-reloader');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: false,
  configureWebpack: {
    entry: {
      background: './src/background.js',
      main: './src/main.js'
    },
    output: {
      filename: (pathData) => {
        return pathData.chunk.name === 'background' ? 'js/background.js' : 'js/[name].[contenthash].js';
      }
    },
    plugins: [
      new ExtReloader({
        manifest: resolve(__dirname, "public/manifest.json")
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/manifest.json', to: 'manifest.json' },
          // If you have icons or other assets you need to include, add them here
          { from: 'public/icons', to: 'icons' },
        ],
      }),
    ],
  }
})