import React, { useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import "./Calendar.css";

const NewCalendarItem = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");

  const titleInputHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionInputHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const dateInputHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const timeInputHandler = (event) => {
    setEnteredTime(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(enteredTitle, enteredDescription, enteredDate, enteredTime);
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
      <Input
        element="input"
        type="date"
        label="Date"
        onChange={dateInputHandler}
        value={enteredDate}
      />
      <Input
        element="input"
        type="text"
        label="Time"
        onChange={timeInputHandler}
        value={enteredTime}
      />

      <Button type="submit">Register</Button>
    </form>
  );
};

export default NewCalendarItem;
