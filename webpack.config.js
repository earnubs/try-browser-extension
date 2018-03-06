const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    background: path.join(__dirname, 'src', 'js', 'background.js'),
    popup: path.join(__dirname, 'src', 'js', 'popup.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'window'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { verbose: true}),
    new CopyWebpackPlugin([{ from: 'src/manifest.json'}, { from: 'src/icons', to: 'icons'}]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    })
  ]
};
