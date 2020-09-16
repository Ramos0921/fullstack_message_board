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
       <div>
         <form>

         </form>
       </div>
     )
   }
}


export default LoginForm;