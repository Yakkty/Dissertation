//This component is responsible for rendering the To do list content and markup.
//This component will display user data retrieved from the parent component, along with adding new items to the list
//This component dynamically renders list items by calling the array.map js method on the items, and mapping each item to a ListItem element
//This child element then receives its required data and functions via props

//Imports
import React, { useState, useContext, Fragment } from "react";

import ListItem from "./ListItem";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./TDList.css";

//This component displays the to do list, along with a form for adding new items to the list
const TDList = (props) => {
  const auth = useContext(AuthContext);

  //Gain access to our custom useHttp hook methods
  const { sendRequest, error, clearError } = useHttp();

  //useState calls for storing user input
  const [item, setItem] = useState("");

  //Handler function for storing user inputs into state
  const itemChangeHandler = (event) => {
    setItem(event.target.value);
  };

  //This function is responsible for handling form submission
  const submitHandler = async (event) => {
    //prevent default stops page reload on form submission
    event.preventDefault();

    //Calling the fetch api to send a POST request to our REST api backend
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_API_URL + "/todolist",
        "POST",
        //JSON.stringify as the backend needs data in json format
        //Passing the creator and the description in the body
        JSON.stringify({
          description: item,
          creator: auth.userId,
        }),
        //Headers set here, content type to app/json so the backend knows to parse json data
        //Auth headers set, providing the token. Only users holding a token can send this http request
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      //Function to store the response data. This is called here but executes in its parent component
      //The response data is passed back as an argument
      props.onAddItem(responseData.TDItem);

      //Clear user input
      setItem("");
    } catch (err) {
      console.log(err);
    }
  };

  //This is the markup of the to do list component, displaying a title, individual list items and a form
  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <div className="box">
        <div>
          <h1>To Do List</h1>
        </div>
        <div className="list-item-box">
          {props.items.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              value={item.description}
              onDelete={props.onDeleteItem}
            />
          ))}
          <form className="form-item__submit" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="New Item"
              onChange={itemChangeHandler}
              value={item}
            ></input>
            <button type="submit">+</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default TDList;
