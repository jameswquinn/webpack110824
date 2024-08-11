const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sharp = require('sharp');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'responsive-loader',
            options: {
              adapter: sharp,
              sizes: [300, 600, 1200, 2000],
              name: 'images/[name]-[width].[ext]',
              format: 'webp',
            },
          },
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'responsive-loader',
            options: {
              adapter: async (imagePath) => {
                const image = sharp(imagePath);
                const metadata = await image.metadata();
                const isTransparent = metadata.hasAlpha;
                return isTransparent ? sharp(imagePath) : sharp(imagePath).flatten({ background: '#FFFFFF' });
              },
              sizes: [300, 600, 1200, 2000],
              name: 'images/[name]-[width]-fallback.[ext]',
              format: (imagePath) => sharp(imagePath).metadata().then(metadata => metadata.hasAlpha ? 'png' : 'jpeg'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    },
    extensions: ['.js', '.jsx'],
  },
};
