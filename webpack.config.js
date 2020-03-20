module.exports = {
    entry: {
        app : "./src/index.js"
    },
    output: {
        filename: "bundle.js",
        path: __dirname + "/public"
    },
    devServer : {
        historyApiFallback: true,
        contentBase : __dirname + '/public',
        port:8080,
        publicPath:'/'
    },
    devtool:"#inline-source-map",
    module:{
        rules:[
            {
            test:/\.js$/,
            enforce:"pre",
            exclude: /node_modules/,
            loader:"eslint-loader"
        },
        {
            test:/\.css$/,
            loader:["style-loader","css-loader"]
        },{
            test:/\.js$/,
            exclude:/node_modules/,
            loader:'babel-loader'
        }]
    }
};