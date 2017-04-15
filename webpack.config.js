module.exports = {
    entry: './public/app.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public',
      },

    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
              },
        ],
      },
  };
