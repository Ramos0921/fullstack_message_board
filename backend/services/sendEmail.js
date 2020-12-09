require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (email)=>{
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
      text:'http://localhost:3001/updatepassword',
    }
    let emailSent = new Promise((resolve, reject)=>{
      transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
          reject(err);
        }else{
          resolve(data);
        }
      })
    })
    return emailSent;
}

module.exports= { sendEmail }