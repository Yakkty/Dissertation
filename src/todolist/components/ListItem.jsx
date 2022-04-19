//This is the child component to TDList, which displays an individual list item in the to do list

//Imports
import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./ListItem.css";

//This component displays a list item containing a particular item from a to do list
//This component receives its data through properties
const ListItem = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();
  //This function is responsible for deleting items from the list
  const deleteItemHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/todolist/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      //onDelete function called here and executed in parent component, passing the item id as an argument
      //This is used to update the user interface
      props.onDelete(props.id);
      console.log(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  //Markup of the list item, consisting of a radio input and a paragraph tag containing the items value
  return (
    <div className="list-item" onClick={deleteItemHandler}>
      <input type="radio" />
      <p>{props.value}</p>
    </div>
  );
};

export default ListItem;
