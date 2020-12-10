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
  const[keyword,setKeyword]=useState('');

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
  const validateKeyword=(keyword)=>{
    if(keyword.trim()===''){
      return false;
    }
    if(keyword.trim().length<5 ||
     keyword.trim().length>5){
      return false;
    }
    return true;
  }
  const validatePassword=(password)=>{
    if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password))){
      return false;
    }
    return true;
  }

  const updatePassword =(e)=>{
    e.preventDefault();
    let checkEmail= validateEmail(email);
    let checkPassword= validatePassword(password);
    let checkKeyword= validateKeyword(keyword);

    if(!checkEmail){
      setEmail('')
      alert('Invalid email entry. Please enter a valid email address')
    }
    if(!checkPassword){
      setPassword('');
      if(!checkPassword){
        setPassword('')
        alert('Invalid password entry please enter a password of length greater than 8 but less 15 characters, catians at least one lowercase, uppercase, numeric, and special characteristic')
        return false;
      }
    }
    if(!checkKeyword){
      setKeyword('');
      alert('Invalid keyword please try enter the correct keyword.')
      return;
    }
    axios.put('http://localhost:3003/updatepassword',
    {email, password, keyword})
    .then((data,err)=>{
      if(err){
        throw(err)
      }
      alert('Your password has been updated please login to continue.')
      history.push('/')
    })
    .catch((e)=>{
      console.error(e)
      alert('An error occurred please try again.')
    })
    setEmail('')
    setPassword('');
    setKeyword('');
  }
  return(
    <div className="formContainer">
      <div className="signHolder">
      <h1>Password Reset</h1>
      <form className="signInForm">
        <p>
          <input className="loginInput" type="email" value={email} name="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/>
        </p>
        <p>
          <input className="loginInput" type="password" value={password} name="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
        </p>
        <p>
          <input className="loginInput" type="text" value={keyword} name="keyword" placeholder="keyword" onChange={(e)=> setKeyword(e.target.value)}/>
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