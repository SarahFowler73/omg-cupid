module.exports = {
    entry: './public/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public',
        publicPath: '/',
      },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
              },
        ],
      },
    devServer: {
        historyApiFallback: true,
      },
  };
