//This is the parent component relating to the calendar section of the website

//Imports
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import CalendarList from "../components/CalendarList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./Calendar.css";

//This component renders a wrapping card element, along with a child component calenders list with data passed to it
//along with a button for redirecting users to a form for adding new calendar items
const Calendar = () => {
  const { sendRequest, error, clearError } = useHttp();

  const [items, setItems] = useState();
  const userId = useParams().uid;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/calendar/user/${userId}`
        );
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

  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
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
