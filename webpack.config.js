const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MyPlugin = require('./plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const conf = {
  entry: {
    main: path.resolve(__dirname, './src/js/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: '[name][ext]',
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MyPlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'), // шаблон
      filename: 'index.html', // название выходного файла
      favicon: path.resolve(__dirname, './src/assets/img/favicon.ico'),
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
        ],
      },
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {targets: 'defaults'}]],
          },
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
    ],
  },
}

module.exports = (env, options)=>{
  const isProd = options.mode === 'production'
  let rulesCSS, ruleFonts, ruleSVG
  if (isProd) {
    conf.devtool = false
    conf.target = 'browserslist'
    rulesCSS = {
      test: /\.(scss|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ],
    }
    ruleFonts = {
      test: /\.(woff(2)?|eot|ttf|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[hash][ext][query]'
      }
    }
    ruleSVG = {
      test: /\.(svg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'svg/[hash][ext][query]'
      }
    }
    conf.module.rules.push(ruleSVG)
    conf.plugins.push(new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[id].[contenthash].css',
    }))
  } else {
    conf.devtool = 'eval-cheap-module-source-map'
    conf.target = 'web'
    rulesCSS = {
      test: /\.(scss|css)$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    }
    ruleFonts = {
      test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
      type: 'asset/inline',
    }
    conf.plugins.push(new ESLintPlugin({}))
  }

  conf.module.rules.push(rulesCSS)
  conf.module.rules.push(ruleFonts)

  return conf
}
