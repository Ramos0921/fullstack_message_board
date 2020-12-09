const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { addUser, findUser } = require('./userDB.js')


const generatePW = (pw)=>{
  const saltRound = 10;
  const result = new Promise((resolve,reject)=>{
    bcrypt.genSalt(saltRound,(err,salt)=>{
      bcrypt.hash(pw,salt,(err,hash)=>{
       if(err){
         reject(err)
         return;
       }
        resolve(hash);
     })
   })
  })
  return result;
}

router.post('/checkuser',async(req,res)=>{
  const user = await findUser(req.body.username)
  const match = await bcrypt.compare(req.body.password,user.password)
  if(match){
    res.status(200).send(true);
  }else{
    res.status(401).send(false);
  }
})

router.post('/signup',async(req,res)=>{
  let userObj = req.body;
  let password= await generatePW(userObj.password);
  userObj.password = password;
  let newUser = await addUser(userObj)
  console.log(newUser.insertedId);
  if(newUser.insertedId){
    res.status(200).send(true);
  }else{
    res.send(500).send(false);
  }
})

router.post('/forgotpassword',(req,res)=>{
  console.log(req.body)
  res.status(200).send("email");
})

module.exports = router;