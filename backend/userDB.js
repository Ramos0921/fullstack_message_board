const  MongoClient  = require('mongodb');
const ObjectID = require('mongodb').ObjectID
require('dotenv').config();
const bcrypt = require('bcrypt');
const { generatePW } = require('./services/generatePassword.js')

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
const findEmail = async (email)=>{
  try{
    const client = await MongoClient.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology: true})
    const db = client.db('msgapp');
    const find = await db.collection('users').findOne({email:email})
    return find;
    client.close();
  }catch(e){
    console.error(e);
    return e;
  }
}
const addKeyWord = async (email,keyword)=>{
  try{
    const client = await MongoClient.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology: true})
    const db = client.db('msgapp');
    const user = await db.collection('users').updateOne({email:email},{
      $set:{
        keyword:keyword,
      }
    })
    if(!user){
      throw('no user found');
    }
    return user;
    client.close();
  }catch(e){
    return e;
  }
}

const updatePassword = async ({email,password})=>{
  try{
    const client = await MongoClient.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology: true})
    const db = client.db('msgapp');
    const user = await db.collection('users').updateOne({email:email},{
      '$set':{
        password: await generatePW(password),
        keyword:"",
      }
    })
    if(!user){
      throw('no user found');
    }
    return user;
    client.close();
  }catch(e){
    return e;
  }
}
const verifyKeyword = async ({email,keyword,password})=>{
  try{
    const client = await MongoClient.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology: true})
    const db = client.db('msgapp');
    const user = await db.collection('users').findOne({email:email})
    if(user.keyword.trim() !== keyword){
      throw('Keyword no match')
    }
    const userUpdated = await updatePassword({email,password});
    if(userUpdated.modifiedCount<1 ||userUpdated.modifiedCount>1){
      throw('An error occured, password was not updated!')
    }
    return userUpdated;
    client.close();
  }catch(e){
    console.error(e);
    return e;
  }
}


module.exports={ addUser, findUser, findEmail, updatePassword, addKeyWord,verifyKeyword }