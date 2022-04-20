//This is the sibling component to Auth.jsx, which is responsible for rendering the registration form
//Along with sending registration form data to the backend for validation

//Imports
import { useState, useContext, Fragment } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { useHttp } from "../../shared/components/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

//This component displays a registration form, will store user inputs into state, and consequently sign users up and log users in
const Signup = () => {
  //Gain access to our AuthContext by calling useContext, this is derived from our App.js context provider
  const auth = useContext(AuthContext);

  //Gain access to our custom useHttp hooks method, which sends HTTP requests to our REST Api backend server
  const { sendRequest, error, clearError } = useHttp();

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

  //This function is responsible for form submission, which registers new users and logs them in
  //This function is asynchronous as it involves sending requests to a backend, which can take some time
  const authSubmitHandler = async (event) => {
    //event prevent default stops the browser reloading the page on form submission
    event.preventDefault();

    try {
      //Call custom http hook method sendrequest to send a POST http request to our rest api backend
      //This function requires a url, which is the url the backend expects, along with the request method, which is a POST request
      const responseData = await sendRequest(
        process.env.REACT_APP_API_URL + "/users/signup",
        "POST",
        //This converts strings to JSON,
        JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        //Headers are set to JSON, which is a very common way of sending data
        {
          "Content-Type": "application/json",
        }
      );

      //Once this request completes, a user will be logged in, passing the users ID and token
      auth.login(responseData.userId, responseData.token);
    } catch (err) {
      //If this fails, the error is logged to the console
      console.log(err);
    }
  };

  //This is the markup for the login form
  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
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
    </Fragment>
  );
};

export default Signup;
