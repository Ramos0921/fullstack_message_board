let path = require('path');
let SRC = path.join(__dirname,'/client');
let DEST = path.join(__dirname,'/public');
module.exports={
  entry:`${SRC}/index.jsx`,
  output:{
    filename: 'bundle.js',
    path: DEST,
  },
  module:{
    rules:[
      {
        test: /\.jsx?/,
        include: SRC,
        loader: 'babel-loader',
        query:{
          presets:['react','es2015']
        },
      },
    ]
  }
}