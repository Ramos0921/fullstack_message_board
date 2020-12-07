var express = require('express');
var router = express.Router();

router.post('/checkuser',(req,res)=>{
  console.log(req.body)
  res.status(200).send("user is okay");
})
router.post('/signup',(req,res)=>{
  console.log(req.body)
  res.status(200).send("signed up");
})
router.post('/forgotpassword',(req,res)=>{
  console.log(req.body)
  res.status(200).send("email");
})

module.exports = router;