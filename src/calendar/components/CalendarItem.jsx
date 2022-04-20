//This component displays an individual calendar item to be displayed in the calendar grid

//Imports
import React, { useContext } from "react";
import { Grid } from "@mui/material";

import Card from "../../shared/components/UIElements/Card";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./CalendarItem.css";

//This component represents a specific item in the calendar
const CalendarItem = (props) => {
  //Gain access to our auth context
  const auth = useContext(AuthContext);
  //Gain access to our send request method from our custom useHttp hook
  const { sendRequest } = useHttp();

  //Handler function for deleting calendar items
  const confirmDeleteHandler = async () => {
    try {
      //This sends a http DELETE request to our rest api backend, passing the item id as a parameter to the url
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/calendar/${props.id}`,
        "DELETE",
        null,
        //Auth headers set as only token holding users are able to send this http request
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      //on delete function called here but executed in parent component, passing the item id as a parameter
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  //This displays the markup for a calendar item
  //This is a grid item element displaying a title, date, description, checkbox and time
  //The delete function is bound to the onclick of the checkbox
  return (
    <Grid item xs={2} sm={2} md={3} key={props.id} zeroMinWidth>
      <Card className="calendar-item__card">
        <div className="calendar-item">
          <div className="calendar-item__title">
            <h2>{props.title}</h2>
            <p>{props.date}</p>
          </div>
          <div className="calendar-item__content">
            <p>{props.description}</p>
          </div>
          <hr />
          <div className="calendar-item__actions">
            <input type="checkbox" onClick={confirmDeleteHandler} />
            <p>{props.time}</p>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default CalendarItem;
