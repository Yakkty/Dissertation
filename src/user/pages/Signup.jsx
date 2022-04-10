//This is the sibling component to Auth.jsx, which is responsible for rendering the registration form
//Along with sending registration form data to the backend for validation

//Imports
import { useState, useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

//This component displays a registration form, will store user inputs into state, and consequently sign users up and log users in
const Signup = () => {
  //Gain access to our AuthContext by calling useContext, this is derived from our App.js context provider
  const auth = useContext(AuthContext);

  //useState calls to store user inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handler functions for storing user inputs, called on the onChange of form inputs
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  //This function is responsible for the submission of the form
  //This will send user inputs to our REST API backend, and then log a user in
  const authSubmitHandler = (event) => {
    //prevent default stops the browser reloading on form submission
    event.preventDefault();
    auth.login();
    console.log(username, password, email);
  };

  //This is the markup for the login form
  return (
    <Card className="auth-form">
      <h1>SIGNUP</h1>
      <hr></hr>
      <form onSubmit={authSubmitHandler}>
        <Input
          element="input"
          id="email"
          type="text"
          label="E-Mail"
          onChange={emailHandler}
        />
        <Input
          element="input"
          id="username"
          type="text"
          label="Username"
          onChange={usernameHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          onChange={passwordHandler}
        />
        <Button type="submit" className="auth-form__actions" inverse>
          SIGNUP
        </Button>
      </form>
      <p>Already have an account? Login instead</p>
      <Button className="auth-form__actions" to="/auth">
        LOGIN
      </Button>
    </Card>
  );
};

export default Signup;
