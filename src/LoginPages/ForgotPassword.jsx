import React,{useState, useEffect} from 'react';
import axios from 'axios';

const ForgotPassword =()=>{
  const[email,setEmail]=useState('');

  const getPassword =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3003/forgotpassword',
    {email})
    .then((data)=>{
      console.log(data.data)
    })

  }
  return(
    <div className="formContainer">
      <div className="signHolder">
      <h1>Get Password</h1>
      <form className="signInForm">
        <p>
          <input className="loginInput" type="text" name="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/>
        </p>
      </form>
      <p>
        <button onClick={(e)=> getPassword(e)}>Get</button>
      </p>
      </div>
    </div>
  )
}

export default ForgotPassword;