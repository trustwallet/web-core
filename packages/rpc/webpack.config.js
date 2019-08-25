const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'BitcoinRPC',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    optimization: {
        minimize: true
    },
    target: 'node',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: { allowTsInNodeModules: true }
        }]
    }
}
