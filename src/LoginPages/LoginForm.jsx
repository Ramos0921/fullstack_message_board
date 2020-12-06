import React,{useState, useEffect} from 'react';
import SignUp from './SignUp.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const LoginForm = ({checkUser}) => {
  const history = useHistory();
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [signUp, setSignUP]=useState(false);
  const [forgotPassword, setForgotPassword]=useState(false);
  const [login, setLogin]=useState(true);

  const handleSignIn=(e)=>{
    e.preventDefault();
    checkUser({username,password});
  }
  const newUser =(e)=>{
    e.preventDefault();
    setSignUP(true);
    setLogin(false);
    setForgotPassword(false);
  }
  const needPassword=()=>{
    setForgotPassword(true);
    setLogin(false);
    setSignUP(false);
  }
  const userCreated =()=>{
    setForgotPassword(false);
    setLogin(true);
    setSignUP(false);
  }

  if(login){
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
          <button onClick={()=> needPassword()}>Forgot password</button>
        </p>
        </div>
      </div>
    )
  }

  if(signUp){
    history.push('/signup')
    return(
      <div></div>
    )
  }
  if(forgotPassword){
    history.push('/forgotpassword')
    return(
      <div></div>
    )
  }
}


export default LoginForm;