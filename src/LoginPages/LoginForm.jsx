import React,{useState, useEffect} from 'react';
import SignUp from './SignUp.jsx';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');

  const validateUserNamae=(username)=>{
    if(username.trim()===''){
      return false;
    }
    if(username.trim().length<3 && username.trim().length<15){
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

  const handleSignIn=(e)=>{
    e.preventDefault();
    let checkUsername= validateUserNamae(username);
    let checkPassword= validatePassword(password);

    if(!checkUsername){
      setUsername('')
      alert('Invalid username please enter a username of length greater than 3 but less 15 characters')
      return false;
    }
    if(!checkPassword){
      setPassword('')
      alert('Invalid password entry please enter a password of length greater than 8 but less 15 characters, catians at least one lowercase, uppercase, numeric, and special characteristic')
      return false;
    }
    axios.post('http://localhost:3003/checkuser',{username, password})
    .then((data,err)=>{
      if(err){
        throw(err)
      }
      console.log(data.data)
      alert('Login successful.')
    })
    .catch((e)=>{
      alert('An authentication error occured please try again.')
      console.error(e);
    })
    setUsername('');
    setPassword('');
  }

  const newUser =(e)=>{
    e.preventDefault();
    history.push('/signup')
  }
  const needPassword=(e)=>{
    e.preventDefault();
    history.push('/forgotpassword')
  }

  return(
      <div className="formContainer">
        <div className="signHolder">
        <h1>Member Login</h1>
        <form className="signInForm">
          <p>
            <input className="loginInput" type="text" value={username} name="username" placeholder="username" onChange={(e)=> setUsername(e.target.value)} required/>
          </p>
          <p>
            <input className="loginInput" type="password" value={password}  name="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)} required/>
          </p>
          <p>
            <button onClick={(e)=> handleSignIn(e)}>Sign In</button>
          </p>
        </form>
        <p>
          <button onClick={(e)=> newUser(e)}>Sign Up</button>
        </p>
        <p>
          <button onClick={(e)=> needPassword(e)}>Forgot password</button>
        </p>
        </div>
      </div>
    )
}


export default LoginForm;