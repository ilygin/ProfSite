const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                    }
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: '127.0.0.1',
        port: 3000,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval'
};