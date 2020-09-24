import React from 'react';

class LoginForm extends React.Component{
  constructor(props){
    super(props)
    this.state={
      email:'',
      userName:'',
      password:'',
    }
   }

   render(){
     return(
       <div className="formContainer">
         <div className="signHolder">
          <h1>Member Login</h1>
          <form className="signInForm">
            <p>
              <input className="loginInput" type="text" name="userName" placeholder="username"/>
            </p>
            <p>
              <input className="loginInput" type="password" name="password" placeholder="password"/>
            </p>
            <p>
              <button>Sign In</button>
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
}


export default LoginForm;