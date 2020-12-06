import React,{useState, useEffect, Component} from 'react';
import axios from 'axios';
import LoginForm from './LoginPages/LoginForm.jsx';
import SignUp from './LoginPages/SignUp.jsx';
import ForgotPassword from './LoginPages/ForgotPassword.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App(){

  return(
      <Router>
          <Switch>
            <Route exact path='/'><LoginForm/></Route>
            <Route path='/signup'><SignUp /></Route>
            <Route path='/forgotpassword'><ForgotPassword /></Route>
          </Switch>
      </Router>
  )

}

export default App;