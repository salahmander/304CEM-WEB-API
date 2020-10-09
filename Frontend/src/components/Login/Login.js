import React, { Component } from "react";
import "./Login.css";

const formValid = formErrors => {
  let valid = true;

  // check if theres as value in form error 
  Object.values(formErrors).forEach(val => {
    if (val.length > 0) {
      valid = false
    }
  });
  return valid
}

class Login extends Component {
  constructor(props){
    super(props);

    this.HandleReg = this.HandleReg.bind(this);

    this.state = {
      username: null,
      password: null,
      formErrors: {
        username: "",
        password: ""
      }
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case 'username':
        formErrors.username = value.length < 1 ? 'Enter your username' : "";
        break;
      case 'password':
        formErrors.password =  value.length < 1 ? 'Enter your password' : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const loginData = {
        username: this.state.username,
        password: this.state.password
      }
    

    //sumbits registration details
    if (formValid(this.state.formErrors)) {
      this.props.onSumbit(loginData)
    }
  };

  HandleReg = event => {
    event.preventDefault();
    this.props.onClick();
  }

  render() {
    let accountError;
    if(this.props.loginError){
      accountError = "Username or Password is incorrect"
    }

    const{ formErrors} = this.state;

    return (
      <div className="wrapperLog">
        <div className="form-wrapperLog">
          <h1 className="Header">Login</h1>
          <form className ="loginForm" onSubmit={this.handleSubmit} noValidate>
            <div className="username">
              <input placeholder="username" type="text" name="username" noValidate onChange={this.handleChange} />
              <span>{formErrors.username}</span>
            </div>
            <div className="password">
              <input placeholder="Password" type="password" name="password" noValidate onChange={this.handleChange} />
              <span>{formErrors.password}</span>
              <span>{accountError}</span>
            </div>
            <div className="loginAccount">
              <button className="logSumbit"type="submit">Login</button>
              <button className="regButton" onClick={this.HandleReg}><small>Don't have an account?</small></button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
