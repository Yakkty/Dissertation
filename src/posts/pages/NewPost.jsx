//This component is responsible for rendering the form for adding new posts

//Imports
import React, { useState, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./PostForm.css";

//This component displays a form for adding new posts and storing user inputs into state
//This component will then send a POST request to the backend to store this new post
const NewPost = () => {
  //Gain access to our auth context
  const auth = useContext(AuthContext);
  //Gain access to our custom useHttp hook methods
  const { sendRequest, error, clearError } = useHttp();

  //useState calls for storing user inputs into state
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredImage, setEnteredImage] = useState({
    id: "",
    value: null,
  });

  //hook for redirecting users on form submission
  const history = useHistory();

  //Handler functions for storing user inputs into state
  const titleInputHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionInputHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const fileInputHandler = (file) => {
    setEnteredImage({
      id: file.id,
      value: file.value,
    });
    console.log(file);
  };

  //This function is responsible for handling form submission
  const submitHandler = async (event) => {
    //prevent default stops page reload on form submission
    event.preventDefault();

    //Using the fetch api to send a http POST request to our rest api backend, this time passing form data
    //form data is used here to be able to send images along with text
    try {
      const formData = new FormData();
      formData.append("title", enteredTitle);
      formData.append("description", enteredDescription);
      formData.append("image", enteredImage.value);
      formData.append("creator", auth.userId);
      await sendRequest(
        //Url set to environment variable as this is production code
        process.env.REACT_APP_API_URL + "/posts",
        "POST",
        formData,
        //An authorization header is set, passing the token. This is an added step of security.
        //Only users with a token are able to send these http requests
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      //Redirect user after submission
      history.push(`/${auth.userId}/posts`);
    } catch (err) {
      console.log(err);
      console.log(enteredImage);
      console.log(enteredDescription);
    }
  };

  //This displays the markup of the form, containing two input elements, an image upload component and a submit button
  //Error modal is displayed if errors are present
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
        <ImageUpload id="image" onInput={fileInputHandler} />

        <Button type="submit">Register</Button>
      </form>
    </Fragment>
  );
};

export default NewPost;
