const  MongoClient  = require('mongodb');
const dbLogin = 'mongodb+srv://eduardo:<>@cluster0.ck1u1.mongodb.net/<>?retryWrites=true&w=majority'

const addUser = async (user)=>{
  try{
    const client = await MongoClient.connect(dbLogin,{useNewUrlParser:true,useUnifiedTopology: true})
    const db = client.db('msgapp');
    const newUser = await db.collection('users').insertOne(user)
    client.close();
    return newUser;
  }catch(e){
    console.error(e);
  }
}

module.exports={ addUser }