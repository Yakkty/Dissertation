//This component is responsible for rendering the login form
//Along with sending login form data to the backend for validation

//Imports
import { useState, useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

//This component displays a login form, will store user inputs into state, and consequently log users in
const Authenticate = () => {
  //Gain access to our AuthContext by calling useContext, this is derived from our App.js context provider
  const auth = useContext(AuthContext);

  //useState calls to store user inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Handler functions for storing user inputs, called on the onChange of form inputs
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
    console.log(username, password);
  };

  //This is the markup for the login form
  return (
    <Card className="auth-form">
      <h1>LOGIN</h1>
      <hr></hr>
      <form onSubmit={authSubmitHandler}>
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
          LOGIN
        </Button>
      </form>
      <p>Don't have an account? Sign up instead</p>
      <Button className="auth-form__actions" to="/signup">
        SIGNUP
      </Button>
    </Card>
  );
};

export default Authenticate;
