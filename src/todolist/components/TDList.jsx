//This component is responsible for rendering the To do list content and markup.
//This component will display user data retrieved from the parent component, along with adding new items to the list
//This component dynamically renders list items by calling the array.map js method on the items, and mapping each item to a ListItem element
//This child element then receives its required data and functions via props

//Imports
import React, { useState } from "react";

import ListItem from "./ListItem";

import "./TDList.css";

//This component displays the to do list, along with a form for adding new items to the list
const TDList = (props) => {
  //useState calls for storing user input
  const [item, setItem] = useState("");

  //Handler function for storing user inputs into state
  const itemChangeHandler = (event) => {
    setItem(event.target.value);
  };

  //This function is responsible for handling form submission
  const submitHandler = (event) => {
    //prevent default stops page reload on form submission
    event.preventDefault();

    //Function to store the response data. This is called here but executes in its parent component
    //The response data is passed back as an argument
    props.onAddItem(item);

    //Clear user input
    setItem("");
  };

  //This is the markup of the to do list component, displaying a title, individual list items and a form
  return (
    <div className="box">
      <div>
        <h1>To Do List</h1>
      </div>
      <div className="list-item-box">
        {props.items.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            value={item.value}
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
  );
};

export default TDList;
