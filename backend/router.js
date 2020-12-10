const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { addUser, findUser, findEmail, updatePassword,addKeyWord,verifyKeyword } = require('./userDB.js');
const { sendEmail } = require('./services/sendEmail.js')
const { generatePW } = require('./services/generatePassword.js')
require('dotenv').config();
const nodemailer = require('nodemailer');



router.post('/checkuser',async(req,res)=>{
  const user = await findUser(req.body.username)
  if(!user){
    res.status(401).send(false);
    return;
  }
  const match = await bcrypt.compare(req.body.password,user.password)
  if(user && match){
    res.status(200).send(true);
  }else{
    res.status(500).send(false);
  }
})

router.post('/signup',async(req,res)=>{
  let userObj = req.body;
  const user = await findUser(userObj.username)
  if(user){
    res.status(401).send(false);
    return;
  }
  let password= await generatePW(userObj.password);
  userObj.password = password;
  let newUser = await addUser(userObj)
  if(newUser.insertedId){
    res.status(200).send(true);
  }else{
    res.send(500).send(false);
  }
})

router.post('/forgotpassword',async(req,res)=>{
  const userEmail = await findEmail(req.body.email);
  if(!userEmail){
    res.status(401).send(false)
    return
  }
  let emailResponse = await sendEmail(userEmail.email,userEmail.username);
  const addKey = await addKeyWord(req.body.email,emailResponse.random)
  if(addKey.modifiedCount>0){
    res.status(200).send(true);
  }else{
    res.status(500).send(false)
  }
})
router.put('/updatepassword',async(req,res)=>{
  const updatePW = await verifyKeyword(req.body);
  if(updatePW==="Keyword no match"){
    res.status(401).send(false)
    return
  }
  if(updatePW.modifiedCount<1 ||updatePW.modifiedCount>1){
    res.status(500).send(false)
  }else{
    res.status(200).send(updatePW);
  }
})
module.exports = router;