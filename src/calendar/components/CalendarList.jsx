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
        />
      ))}
    </Grid>
  );
};

export default CalendarList;
