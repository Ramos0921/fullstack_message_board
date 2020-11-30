import React,{useState, useEffect} from 'react';

const LoginForm = ({checkUser}) => {

  const [email,setEmail]=useState('');
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');

  const handleSignIn=(e)=>{
    e.preventDefault();
    checkUser({username,password});
  }
    return(
      <div className="formContainer">
        <div className="signHolder">
        <h1>Member Login</h1>
        <form className="signInForm">
          <p>
            <input className="loginInput" type="text" name="username" placeholder="username" onChange={(e)=> setUsername(e.target.value) }/>
          </p>
          <p>
            <input className="loginInput" type="password" name="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
          </p>
          <p>
            <button onClick={(e)=> handleSignIn(e)}>Sign In</button>
          </p>
        </form>
        <p>
          <button>Sign Up</button>
        </p>
        <p>
          <button>Forgot password</button>
        </p>
        </div>
      </div>
    )
}


export default LoginForm;