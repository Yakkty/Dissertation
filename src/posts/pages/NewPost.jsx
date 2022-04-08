import React, { useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import "./PostForm.css";

const NewPost = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");

  const titleInputHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionInputHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(enteredTitle, enteredDescription);
  };

  return (
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
  );
};

export default NewPost;
