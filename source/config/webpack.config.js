const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NotifyWebpackPlugin = require('webpack-notifier');
const {scripts, pages} = require('./site')();

let mode = 'production';
let isProd = false;
let publicPath = '/';

switch (process.env.APP_ENV) {
case 'development':
    mode = 'development';
    isProd = false;
    break;
case 'staging':
    mode = 'production';
    isProd = true;
    publicPath = '/';
    if (process.env.PUBLIC_PATH) {
        publicPath = process.env.PUBLIC_PATH;
    }
    break;
default:
    mode = 'production';
    isProd = true;
    publicPath = '/';
    break;
}

let plugins = pages.map((page) => {
    return new HtmlWebpackPlugin(Object.assign({
        minify: {
            removeComments: isProd,
            collapseWhitespace: isProd,
        },
    }, page));
});

const sassExtraTextPlugin = new ExtractTextPlugin({
    filename: 'resources/css/[name].[hash].css',
    disable: false,
    allChunks: true,
});

module.exports = {
    mode: mode,
    context: path.resolve(__dirname, '..', 'www'),
    resolve: {
        extensions: ['.js', '.css'],
        alias: {
            slick: path.resolve(__dirname, 'node_modules/slick-carousel/slick/'),
        },
        modules: [
            path.resolve(__dirname, '..', 'www'),
            'node_modules',
        ],
    },
    watchOptions: {
        poll: true
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'resources/js/[name].[chunkhash].js',
        publicPath,
    },

    entry: scripts,

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules(?!\/webpack-dev-server)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                    'eslint-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: sassExtraTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './config/postcss.config.js',
                                },
                            },
                        },
                        'sass-loader',
                    ],
                    publicPath: '../../',
                }),
            },
            {
                test: /\.css$/,
                use: sassExtraTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './config/postcss.config.js',
                                },
                            },
                        },
                    ],
                    publicPath: '../../',
                }),
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [
                    {
                        loader: 'json-loader',
                    },
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif|webp|ico|mp4|mp3)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name]_[hash].[ext]',
                    },
                },
            },
            {
                test: /\.(eot|svg|woff|ttf)$/,
                use: 'url-loader',
            },
            {
                test: /\.ejs$/,
                use: 'ejs-compiled-loader',
            },
        ],
    },
    plugins: plugins.concat([
        sassExtraTextPlugin,
        new CopyWebpackPlugin([
            {from: 'resources/img/favicon.ico', to: 'resources/img/favicon.ico'},
            {from: 'resources/pdf/', to: 'pdf/'},
            // {from: 'resources/img/ogp.jpg', to: 'resources/img/ogp.jpg'},
        ]),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise',
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new NotifyWebpackPlugin(),
    ]),

    devtool: isProd ? false : 'eval-source-map',

    devServer: {
        contentBase: path.join(__dirname, isProd ? 'dist' : 'www'),
        compress: isProd,
        port: 3000,
        host: '0.0.0.0',
    },
};
