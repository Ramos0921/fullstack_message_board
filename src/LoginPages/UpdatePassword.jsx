import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const UpdatePassword =()=>{
  const history = useHistory();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

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
  const updatePassword =(e)=>{
    e.preventDefault();
    let checkEmail= validateEmail(email);
    if(!checkEmail){
      setEmail('')
      alert('Invalid email entry. Please enter a valid email address')
    }
    axios.put('http://localhost:3003/updatepassword',
    {email, password})
    .then((data)=>{
      alert('')
      console.log(data.data)
      //history.push('/')
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
        <p>
          <input className="loginInput" type="password" value={password} name="email" placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
        </p>
      </form>
      <p>
        <button onClick={(e)=> updatePassword(e)}>Get</button>
      </p>
      </div>
    </div>
  )
}

export default UpdatePassword;