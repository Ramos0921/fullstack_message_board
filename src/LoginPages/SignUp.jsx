import React,{useState, useEffect} from 'react';
import axios from 'axios';
const SignUp=()=>{
  const[fname,setFname]=useState('');
  const[lname,setLname]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[username,setUsername]=useState('');

  const newUser=(e)=>{
    e.preventDefault();
    console.log({fname,lname,email,password,username})
    axios.post('http://localhost:3003/signup',
    {fname,lname,email,password,username})
    .then((data)=>{
      console.log(data.data)
    })
  }
  return(
    <div className="formContainer">
        <div className="signHolder">
        <h1>Sign Up</h1>
        <form className="signInForm">
          <p>
            <input className="loginInput" type="text" name="fname" placeholder="first name" onChange={(e)=> setFname(e.target.value) }/>
          </p>
          <p>
            <input className="loginInput" type="text" name="lname" placeholder="last name" onChange={(e)=> setLname(e.target.value) }/>
          </p>
          <p>
            <input className="loginInput" type="email" name="email" placeholder="email" onChange={(e)=> setEmail(e.target.value) }/>
          </p>
          <p>
            <input className="loginInput" type="text" name="username" placeholder="username" onChange={(e)=> setUsername(e.target.value) }/>
          </p>
          <p>
            <input className="loginInput" type="password" name="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
          </p>
        </form>
        <p>
          <button onClick={(e)=> newUser(e)}>Sign Up</button>
        </p>
        </div>
      </div>
  )
}

export default SignUp;