import React from 'react';

const ForgotPassword =()=>{

  return(
    <div className="formContainer">
      <div className="signHolder">
      <h1>Get Password</h1>
      <form className="signInForm">
        <p>
          <input className="loginInput" type="text" name="username" placeholder="username" onChange={(e)=> setUsername(e.target.value)}/>
        </p>
      </form>
      <p>
        <button onClick={(e)=> newUser(e)}>Sign Up</button>
      </p>
      </div>
    </div>
  )
}

export default ForgotPassword;