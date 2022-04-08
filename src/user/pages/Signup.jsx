import { useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";

import "./Auth.css";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(username, password, email);
  };
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
      <Button className="auth-form__actions" to="/auth">LOGIN</Button>
    </Card>
  );
};

export default Signup;
