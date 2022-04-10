//This is the parent component responsible for the To do list

//Imports
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import TDList from "../components/TDList";

const ITEMS = [
  { id: "i1", value: "Service car", creator: "u1" },
  { id: "i2", value: "Fix sink", creator: "u1" },
  { id: "i3", value: "Service car", creator: "u1" },
  { id: "i4", value: "Fix sink", creator: "u1" },
  { id: "i5", value: "Service car", creator: "u1" },
  { id: "i6", value: "Fix sink", creator: "u1" },
  { id: "i7", value: "Cut grass", creator: "u2" },
  { id: "i8", value: "Eat lunch", creator: "u2" },
];

//This component displays a child component TDList, which displays the collection of to do list items, retrieved from a database
const ToDoList = () => {
  //useState calls for storing new to do list items
  const [TDItems, setTDItems] = useState(ITEMS);
  //Gain access to the userId from the url parameters
  const userId = useParams().uid;

  const userItems = ITEMS.filter((item) => item.creator === userId);

  const addTDItemHandler = (item) => {
    console.log(item);
  };

  const deleteTDItemHandler = (deletedItemId) => {
    console.log(deletedItemId);
  };

  //This returns the TDList component, passing the users items and relevant functions
  return (
    <TDList
      items={userItems}
      onDeleteItem={deleteTDItemHandler}
      onAddItem={addTDItemHandler}
    />
  );
};

export default ToDoList;
