let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let morgan = require('morgan');

let app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

const PORT = process.env.PORT || 3003;

// app.get('/',(req,res)=>{
//   res.send('hi')
// })

app.listen(PORT,()=>{
  console.log(`Connected to ${PORT}`);
});
