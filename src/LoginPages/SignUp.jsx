import React,{useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import axios from 'axios';


const SignUp=()=>{
  const history = useHistory();
  const[fname,setFname]=useState('');
  const[lname,setLname]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[username,setUsername]=useState('');

  const validateName = (name)=>{
    if(name.trim()===''){
      return false;
    }
    if(name.trim().length<3){
      return false;
    }
    if(/[^a-zA-Z -]/.test(name)){
      return false;
    }
    return true;
  }
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

  const newUser=(e)=>{
    e.preventDefault();
    let checkFirstName = validateName(fname);
    let checkLastName = validateName(lname);
    let checkEmail= validateEmail(email);
    let checkUsername= validateUserNamae(username);
    let checkPassword= validatePassword(password);
    if(!checkFirstName){
      setFname('');
      alert('Invalid first name entry. Please use only letters and a length greater than 3 charaters.')
      return false;
    }
    if(!checkLastName){
      setLname('');
      alert('Invalid Last name entry. Please use only letters and a length greater than 3 charaters.')
      return false;
    }
    if(!checkEmail){
      setEmail('')
      alert('Invalid email entry. Please enter a valid email address')
    }
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
    axios.post('http://localhost:3003/signup',
    {fname,lname,email,password,username})
    .then((data,err)=>{
      if(err){
        throw(err);
      }
      alert("Thank you for signing up to Basic Message App! Now please login and enjoy!");
      history.push('/')
    })
    .catch((err)=>{
      console.log(err)
      alert('Username is already in use please try a different username.')
    })

    setFname('');
    setLname('');
    setEmail('');
    setUsername('');
    setPassword('');
  }
  return(
    <div className="formContainer">
        <div className="signHolder">
        <h1>Sign Up</h1>
        <form className="signInForm">
          <p>
            <input className="loginInput" type="text" value={fname} name="fname" placeholder="first name" onChange={(e)=> setFname(e.target.value)} title="first name" pattern="[A-Za-z]{25}"/>
          </p>
          <p>
            <input className="loginInput" type="text" value={lname} name="lname" placeholder="last name" onChange={(e)=> setLname(e.target.value)} title="last name"/>
          </p>
          <p>
            <input className="loginInput" type="email" value={email} name="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} title="email"/>
          </p>
          <p>
            <input className="loginInput" type="text" value={username} name="username" placeholder="username" onChange={(e)=> setUsername(e.target.value)} title="username"/>
          </p>
          <p>
            <input className="loginInput" type="password" value={password} name="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)} title="password"/>
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