//This is the parent component responsible for the To do list

//Imports
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import TDList from "../components/TDList";

import { useHttp } from "../../shared/components/hooks/http-hook";

//This component displays a child component TDList, which displays the collection of to do list items, retrieved from a database
const ToDoList = () => {
   //Gain access to our send request method from our custom useHttp hook
  const { sendRequest } = useHttp();
  //useState calls for storing new to do list items
  const [TDItems, setTDItems] = useState([
    {
      description: "Add new items!",
    },
  ]);
  //Gain access to the userId from the url parameters
  const userId = useParams().uid;

  //Useeffect call using the fetch api to send a http GET request to our backend to get a list of all todolist items for a user
  //This will run initially on page rerender, and when any of its dependancies change, i.e sendrequest function, userid and tditems
  useEffect(() => {
    const fetchItems = async () => {
      try {
        //Dynamically set url providing the userid, so only tditems for a specific user get fetched
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/todolist/user/${userId}`
        );
        //Store this response in state
        setTDItems(responseData.usertdItems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [sendRequest, userId, TDItems]);

  //This handler function is to add td items to the pre existing td items state
  //This is dependent on the previous items snapshot, which we gain access to from the spread operator
  //We then return an updated state snapshot including the new td item and the previous items
  const addTDItemHandler = (TDItems) => {
    setTDItems((prevItems) => {
      return [...prevItems, TDItems];
    });
  };

  //Handler function for removing items from the tditems state
  //This is strictly for rerendering the UI on item deletion
  //This function sets the tditems to include every item where the id does not match the id of the deleted item
  const deleteTDItemHandler = (deletedItemId) => {
    setTDItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedItemId)
    );
  };

  //This returns the TDList component, passing the users items and relevant functions
  return (
    <Fragment>
      {TDItems && (
        <TDList
          items={TDItems}
          onDeleteItem={deleteTDItemHandler}
          onAddItem={addTDItemHandler}
        />
      )}
    </Fragment>
  );
};

export default ToDoList;
