const path = require('path')

module.exports = {
    target: 'node',
    entry: {
        path: './src/app.js',
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}