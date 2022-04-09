import { Grid } from "@mui/material";

import Card from "../../shared/components/UIElements/Card";

import "./CalendarItem.css";

const CalendarItem = (props) => {
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
            <input type="checkbox" />
            <p>{props.time}</p>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default CalendarItem;
