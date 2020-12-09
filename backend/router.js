const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { addUser } = require('./userDB.js')
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
  console.log(req.body.password)
  console.log(storage[0]);
  const match = await bcrypt.compare(req.body.password,storage[0])
  console.log(match);
  res.status(200).send("user is okay");
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