//This is the child component to TDList, which displays an individual list item in the to do list

//Imports
import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./ListItem.css";

//This component displays a list item containing a particular item from a to do list
//This component receives its data through properties
const ListItem = (props) => {
  //Gain access to our auth context
  const auth = useContext(AuthContext);
   //Gain access to our send request method from our custom useHttp hook
  const { sendRequest } = useHttp();

  //This function is responsible for deleting items from the list
  //This function uses the fetch api to call a DELETE request to our rest api backend
  //This url contains a dyanmical segment, passing the id of the todolist item to correctly identify what to delete
  const deleteItemHandler = async () => {
    try {
      await sendRequest(
        //Environment variable for the url as this is production code.
        `${process.env.REACT_APP_API_URL}/todolist/${props.id}`,
        "DELETE",
        null,
        //An authorization header is set, passing the token. This is an added step of security.
        //Only users with a token are able to send these http requests
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
