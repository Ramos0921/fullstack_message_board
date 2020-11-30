import React,{useState, useEffect, Component} from 'react';
import axios from 'axios';
import LoginForm from './LoginForm.jsx';

function App(){

  const[loggedIn, setLogIn]=useState(false);

  const checkUser = ({username,password})=>{
    fetch(`/api/checkuser/`,{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{
        'Content-type':'application/json',
      }
    })
    .then((data)=>{
      console.log(data.json());
    })

  }


  if(loggedIn){

  }else{
    return(
            <div>
              <LoginForm checkUser={checkUser}/>
            </div>
          )
  }


}

export default App;