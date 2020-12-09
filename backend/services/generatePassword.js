const bcrypt = require('bcrypt');

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

module.exports= { generatePW }