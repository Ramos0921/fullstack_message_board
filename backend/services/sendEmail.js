require('dotenv').config();
const nodemailer = require('nodemailer');
const Str = require('@supercharge/strings')

const sendEmail = async (email,username)=>{
  const random = await Str.random(5)
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user: process.env.APP_EMAIL_USER,
      pass: process.env.APP_EMAIL_PW,
    }
    })
    let mailOptions={
      from: process.env.APP_EMAIL,
      to:email,
      subject:'Reset Basic Message App password',
      text:`${username} follow this link to reaset your password http://localhost:3001/updatepassword use this string to verify your account: ${random}`,
    }
    let emailSent = new Promise((resolve, reject)=>{
      transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
          reject(err);
        }else{
          let successOBj={
            data:data,
            random:random,
          }
          resolve(successOBj);
        }
      })
    })
    return emailSent;
}

module.exports= { sendEmail }