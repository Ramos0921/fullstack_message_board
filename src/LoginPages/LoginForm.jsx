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
  const [signUp, setSignUP]=useState(false);
  const [forgotPassword, setForgotPassword]=useState(false);
  const [login, setLogin]=useState(true);

  const handleSignIn=(e)=>{
    e.preventDefault();
    //console.log({ username, password})
    axios.post('http://localhost:3003/checkuser',{username, password})
    .then((data)=>{
      console.log(data.data)
    })
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
            <input className="loginInput" type="text" name="username" placeholder="username" onChange={(e)=> setUsername(e.target.value)}/>
          </p>
          <p>
            <input className="loginInput" type="password" name="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
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