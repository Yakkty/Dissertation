//This is the parent component relating to the calendar section of the website

//Imports
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import CalendarList from "../components/CalendarList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

// import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./Calendar.css";

//This component renders a wrapping card element, along with a child component calenders list with data passed to it
//along with a button for redirecting users to a form for adding new calendar items
const Calendar = () => {
  //Gain access to our custom useHttp hook methods
  const { sendRequest, error, clearError } = useHttp();

  //useState call for storing items
  const [items, setItems] = useState();
  //Get user id from the url
  const userId = useParams().uid;

  //Useeffect call for fetching all calendar items relating to a specific user
  useEffect(() => {
    const fetchItems = async () => {
      try {
        //http GET request to our rest api backend using the fetch api
        //Dynamically set url to only get calendar items for a specific user id
        const responseData = await sendRequest(
          //Url set to environment variable as this is production code
          `${process.env.REACT_APP_API_URL}/calendar/user/${userId}`
        );
        //Store this response data into state
        setItems(responseData.userCalendarItems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [sendRequest, userId]);

  //Handler function for deleting calendar items from the calendar item state
  const deleteItemHandler = (deletedItemId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedItemId)
    );
  };

  //Below is the markup for the overall calendar page
  //Error modal is displayed if errors are present
  //If there are items in the item state then a card is shown displaying all of a users calendar items
  //Below is another card displaying a title and a button allowing users to get redirected to the add calendar item page
  return (
    <Fragment>
      {error && items && <ErrorModal error={error} onClear={clearError} />}
      {items && (
        <Card className="Calendar-card">
          <CalendarList items={items} onDeleteItem={deleteItemHandler} />
        </Card>
      )}
      <Card className="Calendar-card__new">
        <h2>Add a new Calendar Item</h2>
        <Button className="Calendar-card__button" to="/calendar/new">
          Add
        </Button>
      </Card>
    </Fragment>
  );
};

export default Calendar;
