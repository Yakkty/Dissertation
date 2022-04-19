//This component is responsible for rendering the form for adding new calendar items

//Imports
import React, { useState, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./Calendar.css";

//This component displays a form, stores user inputs into state
// then sends a POST request to the backend for saving new calendar items
const NewCalendarItem = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, error, clearError } = useHttp();

  //useState calls for storing user inputs
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");

  //useHistory call for redirecting users after they're done
  const history = useHistory();

  //Handler functions for storing user inputs into state, to then be passed to the backend
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

  //This function is responsible for handling form submission
  const submitHandler = async (event) => {
    //prevent default to stop page reload on form submission
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/calendar",
        "POST",
        JSON.stringify({
          title: enteredTitle,
          description: enteredDescription,
          date: enteredDate,
          time: enteredTime,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      //Redirect user after submission
      history.push(`/${auth.userId}/calendar`);
    } catch (err) {
      console.log(err);
    }
  };

  //Markup for this form, purely consisting of inputs and a submit button
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
    </Fragment>
  );
};

export default NewCalendarItem;
