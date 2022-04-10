//This component is responsible for displaying a list of calendar items, which is dynamically set
//This is achieved by calling the array.map method on the items data, and mapping each item in the array to
//a child element that receives all required data and functions via props
//This layout is achieved with MUI grid layout

//Imports
import { Grid } from "@mui/material";

import CalendarItem from "./CalendarItem";

import "./CalendarList.css";

const CalendarList = (props) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 6 }}
      columns={{ xs: 3, sm: 6, md: 12 }}
    >
      {props.items.map((item) => (
        <CalendarItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
          time={item.time}
          creatorId={item.creator}
          onDelete={props.onDeleteItem}
        />
      ))}
    </Grid>
  );
};

export default CalendarList;
