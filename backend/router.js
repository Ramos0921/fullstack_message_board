const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { addUser, findUser } = require('./userDB.js');
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
    res.status(401).send(false);
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
  console.log(req.body.email)
  let emailResponse = await sendEmail(req.body.email);
  console.log(emailResponse.accepted)
  if(emailResponse.accepted.length>0){
    res.status(200).send(true);
  }else{
    res.status(401).send(false)
  }
})
router.put('/updatepassword',(req,res)=>{
  console.log(req.body)
  res.status(200);
})
module.exports = router;