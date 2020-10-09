import React, { Component } from "react";
import "./register.css";

//regular expression
const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*.])(?=.{8,})/); // regular expresssion for password, Password must contain 1 upper case, 1 lower case , 1 number, 1 special character and must be greater than 8
const emailRegex = RegExp (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/); //regular expression for email

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

class Register extends Component {
  constructor(props) {
    super(props);

    this.HandleLog = this.HandleLog.bind(this)

    this.state = {
      firstName: null,
      surname: null,
      email: null,
      username: null,
      password: null,
      confirmPassword: null,
      formErrors: {
        firstName: " ",
        surname: " ",
        email: " ",
        username: " ",
        password: " ",
        confirmPassword: " "
      }
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    let len = this.props.check.length;
    let formErrors = this.state.formErrors;

    const regDetails = [
        {
          firstName: this.state.firstName,
          surname: this.state.surname,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          role: "user"
        }
      ]

    //sumbits registration details
    for (let i = 0; i < len; i++) {

      if (this.props.check[i].username === this.state.username) { //checks if username exist
        formErrors.username = "This username aleady exist"
      }

      if (this.props.check[i].email === this.state.email){   // checks if email exists
        formErrors.email = "User already exist with this email"
      }
    }

    if (formValid(this.state.formErrors)) {
      this.props.onRegister(regDetails);
    }
    this.setState({ formErrors});
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case 'firstName':
        formErrors.firstName = value.length === 0 ? ' Please enter your first name ' : "";
        break;
      case 'surname':
        formErrors.surname = value.length === 0 ? ' Please enter your surname ' : "";
        break;
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : "Please enter your email";
        break;
      case 'username':
        formErrors.username = value.length < 5 ? ' Username must be greater than 5 characters ' : "";
        break;
      case 'password':
        formErrors.password = passwordRegex.test(value)  ? '' : " Password must contain 1 upper case, 1 lower case , 1 number, 1 special character and must be greater than 8 ";
        break;
      case 'confirmPassword':
        formErrors.confirmPassword = value === this.state.password ? '' : "Your passwords do not match "; 
        break;
        default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  }

  HandleLog(event){
    event.preventDefault();
    this.props.onClick();
  }

  render() {

    const{ formErrors} = this.state;


    return (

      <div className="wrapper">
        <div className="form-wrapperReg">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <input placeholder="First Name" type="text" name="firstName" noValidate onChange={this.handleChange} />
              <span className="errorMessage">{formErrors.firstName}</span>
            </div>
            <div className="surname">
              <input placeholder="surname" type="text" name="surname" noValidate onChange={this.handleChange} />
              <span className="errorMessage">{formErrors.surname}</span>
            </div>
            <div className="email">
              <input placeholder="Email" type="email" name="email" noValidate onChange={this.handleChange} />
              <span className="errorMessage">{formErrors.email}</span>
            </div>
            <div className="username">
              <input placeholder="username" type="text" name="username" noValidate onChange={this.handleChange} />
              <span className="errorMessage">{formErrors.username}</span>
            </div>
            <div className="password">
              <input placeholder="Password" type="password" name="password" noValidate onChange={this.handleChange} />
              <span className="errorMessage">{formErrors.password}</span>
            </div>
            <div className="confirmPassword">
              <input placeholder="confirmPassword" type="Password" name="confirmPassword" noValidate onChange={this.handleChange} />
              <span className="errorMessage">{formErrors.confirmPassword}</span>
            </div>
            <div className="createAccount">
              <button className="regSumbit" type="submit">Register</button>
              <button className="regButton" onClick={this.HandleLog}><small>Already Have an Account?</small></button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;





































































































/* https://www.youtube.com/watch?v=4CeTFW4agRw&t=1991s*/
