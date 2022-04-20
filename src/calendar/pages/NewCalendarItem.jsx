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
  //Gain access to our auth context
  const auth = useContext(AuthContext);
  //Gain access to our custom useHttp hook methods
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
      //Send a http POST request to our rest api backend
      await sendRequest(
        //Url set to environment variable as this is production code
        process.env.REACT_APP_API_URL + "/calendar",
        "POST",
        //Convert data to json as thats what is required by our backend
        //Pass the data stored in state to the request body
        //Get the user id from our auth context and pass that as the value for the creator field
        JSON.stringify({
          title: enteredTitle,
          description: enteredDescription,
          date: enteredDate,
          time: enteredTime,
          creator: auth.userId,
        }),
        //Setting headers, content type is set to json to notify the backend that json data is being sent
        //Providing user token in the auth header
        //This added security step is to prevent unauthenticated users from sending http requests
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
