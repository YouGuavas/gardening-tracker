import React, {useRef, useState} from 'react';
import { registerUser, loginUser } from '../utils/api';

import '../styles/Login.scss';


export const Login = (props) => {
  const form = useRef();
  const [loginParams, setLoginParams] = useState({
    username: '',
    password: ''
  });
  const [registrationParams, setRegistrationParams] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  //-----//
  const handleLoginChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'username') {
      setLoginParams({
        username: value,
        password: loginParams.password
      })
      //if field being typed in is "username," update state accordingly
    } else {
      setLoginParams({
        username: loginParams.username,
        password: value
      })
      //else, field being typed in should be "password"
    }
  }
  //-------//
  const handleRegisterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'username') {
      setRegistrationParams({
        username: value,
        email: registrationParams.email,
        password: registrationParams.password
      })
    //if field being typed in is "username," update state accordingly
    } else if (name === 'email') {
      setRegistrationParams({
        username: registrationParams.username,
        email: value,
        password: registrationParams.password
      })
    //else, if field being typed in is "email," update state accordingly
    } else {
      setRegistrationParams({
        username: registrationParams.username,
        email: registrationParams.email,
        password: value
      })
    //else, field being typed in should be "password"
    }
  }
  //-------//
  const handleLogin = (data) => {
    if (data) {
      props.setIsLoggedIn(true);
      props.setUserName(data.username);
      localStorage.setItem('gardeningTrackerLogin', 
      JSON.stringify(data));
    } else {
      props.setIsLoggedIn(false);
      localStorage.removeItem('gardeningTrackerLogin');
    }

  }
  //-------//
  const login = async (e) => {
    e.preventDefault();
    const form = document.getElementById('login-form');
    const login = await loginUser(loginParams);
    if (login) {
      handleLogin(login)
    }
    //if login process was successful, update app-wide state to reflect that
    form.reset();
  }
  //-------//
  const register = async (e) => {
    e.preventDefault();
    const form = document.getElementById('registration-form');
    const registration = await registerUser(registrationParams);
    setRegistrationSuccess(registration);
    //update component state to reflect registration success/failure
    form.reset();
  }
  //-------//
  return (
    <div className="main form-container">

      <form name="login" onSubmit={login} id="login-form">

        <h4 className="form-title">Log in here:</h4>

        <div className="container-full">
          <label htmlFor="username">Username / Email:</label>
          <input type="text" name="username" placeholder="Username/Email" id="login_username" onChange={(e) => {handleLoginChange(e)}}/>
        </div>

        <div className="container-full">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password" id="login_password" onChange={(e) => {handleLoginChange(e)}}/>
        </div>

        <div className="container-full">
          <input className="submit-button" type="submit" value="Login" name="submit" id="login_submit"/>
        </div>

      </form>


      <form name="register" onSubmit={register} id="registration-form">

        <h4 className="form-title">Not a user? Register here:</h4>
        
        {(typeof registrationSuccess !== 'object') ? <h5>{registrationSuccess}</h5> : null}
        <div className="container-full">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" placeholder="Username" id="registration_username" onChange={(e) => {handleRegisterChange(e)}}/>
        </div>

        <div className="container-full">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="Email" id="registration_email" onChange={(e) => {handleRegisterChange(e)}}/>
        </div>

        <div className="container-full">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password" id="registration_password" onChange={(e) => {handleRegisterChange(e)}}/>
        </div>

        <div className="container-full">
          <input className="submit-button" type="submit" value="Register" name="submit" id="registration_submit"/>
        </div>

      </form>


    </div>
  )
}