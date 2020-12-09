const  MongoClient  = require('mongodb');
require('dotenv').config();
const dbLogin = 'mongodb+srv://eduardo:cruzazul@cluster0.ck1u1.mongodb.net/msgapp?retryWrites=true&w=majority'

const addUser = async (user)=>{
  try{
    const client = await MongoClient.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology: true})
    const db = client.db('msgapp');
    const newUser = await db.collection('users').insertOne(user)
    client.close();
    return newUser;
  }catch(e){
    console.error(e);
  }
}
const findUser = async (user)=>{
  try{
    const client = await MongoClient.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology: true})
    const db = client.db('msgapp');
    const find = await db.collection('users').findOne({username:user})
    return find;
    client.close();
  }catch(e){
    console.error(e);
    return e;
  }
}

module.exports={ addUser, findUser }