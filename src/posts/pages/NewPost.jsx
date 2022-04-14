//This component is responsible for rendering the form for adding new posts

//Imports
import React, { useState, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./PostForm.css";

//This component displays a form for adding new posts and storing user inputs into state
//This component will then send a POST request to the backend to store this new post
const NewPost = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, error, clearError } = useHttp();

  //useState calls for storing user inputs into state
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");

  //hook for redirecting users on form submission
  const history = useHistory();

  //Handler functions for storing user inputs into state
  const titleInputHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionInputHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  //This function is responsible for handling form submission
  const submitHandler = async (event) => {
    //prevent default stops page reload on form submission
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/posts",
        "POST",
        JSON.stringify({
          title: enteredTitle,
          description: enteredDescription,
          creator: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
      //Redirect user after submission
      history.push(`/${auth.userId}/posts`);
    } catch (err) {
      console.log(err);
    }
  };

  //This displays the markup of the form, containing two input elements and a submit button

  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <form className="post-form" onSubmit={submitHandler}>
        <Input
          element="input"
          type="text"
          label="Title"
          onChange={titleInputHandler}
          value={enteredTitle}
        />
        <Input
          element="textarea"
          type="text"
          label="Description"
          onChange={descriptionInputHandler}
          value={enteredDescription}
        />

        <Button type="submit">Register</Button>
      </form>
    </Fragment>
  );
};

export default NewPost;
