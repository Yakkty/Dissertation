import { useState, useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";
const Authenticate = () => {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    auth.login();
    console.log(username, password);
  };
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
        LOGIN
      </Button>
    </Card>
  );
};

export default Authenticate;
