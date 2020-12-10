import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const ForgotPassword =()=>{
  const history = useHistory();
  const[email,setEmail]=useState('');

  const validateEmail=(email)=>{
    if(email.trim()===''){
      return false;
    }
    if(email.trim().length<8){
      return false;
    }
    if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
      return false;
    }
    return true;
  }
  const getPassword =(e)=>{
    e.preventDefault();
    let checkEmail= validateEmail(email);
    if(!checkEmail){
      setEmail('')
      alert('Invalid email entry. Please enter a valid email address')
    }
    axios.post('http://localhost:3003/forgotpassword',
    {email})
    .then((data,err)=>{
      if(err){
        throw(err);
      }
      alert('An email containing a link to reset your password has been sent. Please retrieve your reset your password and login.')
      history.push('/')
    })
    .catch((e)=>{
      console.error(e)
      alert('An error occurred please re-enter your email');
    })
    setEmail('')
  }
  return(
    <div className="formContainer">
      <div className="signHolder">
      <h1>Password Reset</h1>
      <form className="signInForm">
        <p>
          <input className="loginInput" type="text" value={email} name="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/>
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