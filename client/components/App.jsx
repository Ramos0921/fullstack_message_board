import React        from 'react';
import axios        from 'axios';
import LoginForm    from './LoginForm.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loggedIn:false,
    }
    this.checkUser= this.checkUser.bind(this);
  }

  checkUser(user){
    console.log(user)
  }

  render(){
    if(this.state.loggedIn===false){
      return(
        <div>
          <LoginForm checkUser={this.checkUser}/>
        </div>
      )
    }
  }
}

export default App;