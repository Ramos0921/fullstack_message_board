let path = require('path');
let SRC = path.join(__dirname,'/src');
let DEST = path.join(__dirname,'/public');
module.exports={
  entry:`${SRC}/index.jsx`,
  output:{
    filename: 'bundle.js',
    path: DEST,
  },
  module:{
    loaders: [
      {
          loader: 'babel-loader',
          test: /\.jsx$/,
          query:{
            presets:['react','es2015','env','stage-2'],
            plugins:['transform-object-rest-spread']
          },
          exclude: /node_modules/
      }
  ]
},
devServer: {
  contentBase: path.join(__dirname, '/public'),
  historyApiFallback: true,
  compress: true,
  watchContentBase: true,
  port: 3001
  }
}
