const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TODOs list'
      }),
      new InjectManifest(),
      new WebpackPwaManifest({
        name:'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Takes notes with JavaScript syntax highliting!',
        startURL: './',
        Theme_color: '#225ca3',
        Backround_color: '#225ca3',
        orientation: 'portrait',
        Display: 'standalone',
        publicPath: './',
        icons:[
          {
            src:path.resolve('assets/images/logo.png'),
            sizes: [96,128,192,256,384,512],
            destination: path.join('assets','icon'),
          },
        ],
      }),
      new GenerateSW({
        runtimeCaching: [
         {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options:{
            cacheName: 'asset-cache',
            plugins: [
              new CacheableResponsePlugin({
                statuses: [0, 200],
              }),
              new ExperationPlugin({
                maxAgeSeconds: 30*24*60*60,
              }),
            ]
          },
         } ,
         {
          urlPattern: /\.(?:css|js)$/,
          handler: 'StaleWhileRevalidate',
         },
        ],
      }),
      new GenerateSW({
        // Define the cache name
        swDest: 'service-worker.js',
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp('/'), // Cache all requests
            handler: 'CacheFirst',
            options: {
              cacheName: 'page-cache',
              plugins: [
                {
                  cacheableResponse: {
                    statuses: [0, 200],
                  },
                },
              ],
            },
          },
        ],
      }),

    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        
      ],
    },
  };
};
