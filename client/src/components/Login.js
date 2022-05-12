import React, {useRef, useState, useEffect} from 'react';
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
  const [loginSuccess, setLoginSuccess] = useState({truth: null});


  const handleLoginChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'username') {
      setLoginParams({
        username: value,
        password: loginParams.password
      })
    } else {
      setLoginParams({
        username: loginParams.username,
        password: value
      })
    }
  }

  const handleRegisterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'username') {
      setRegistrationParams({
        username: value,
        email: registrationParams.email,
        password: registrationParams.password
      })
    } else if (name === 'email') {
      setRegistrationParams({
        username: registrationParams.username,
        email: value,
        password: registrationParams.password
      })
    } else {
      setRegistrationParams({
        username: registrationParams.username,
        email: registrationParams.email,
        password: value
      })
    }
  }

  const login = async (e) => {
    e.preventDefault();
    const form = document.getElementById('login-form');
    const login = await loginUser(loginParams);
    setLoginSuccess(login);
    if (loginSuccess) props.handleLogin(true)
    form.reset();
  }
  const register = async (e) => {
    e.preventDefault();
    const form = document.getElementById('registration-form');
    const registration = await registerUser(registrationParams);
    setRegistrationSuccess(registration);
    form.reset();
  }

  return (
    <div className="main form-container">


      <form name="login" onSubmit={login} id="login-form">

        <h4 className="form-title">Log in here:</h4>
        {loginSuccess.truth === false ? <h5 className="notification">{loginSuccess.message}</h5> : loginSuccess.truth ? <h5 className="notification">Login successful!</h5> : null}

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
        {registrationSuccess ? <h5>{registrationSuccess}</h5> : null}
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


export const AlreadyLoggedIn = (props) => {
  return (
    <div>
      Already Logged in.
    </div>
  )
}