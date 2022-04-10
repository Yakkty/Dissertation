//This component is responsible for displaying all items in the pinboard using MUI grid layout
//This component dynamically displays pinboard items based off of the length of the array received via props
//This is achieved by calling array.map on the items array, and mapping each item to a pinboard item component
//This component receives all necessary values via props

//Imports
import { Grid } from "@mui/material";

import PinboardItem from "./PinboardItem";

import "./PinboardLayout.css";

const PinboardLayout = (props) => {
  return (
    <Grid container spacing={{ md: 0 }} columns={{ md: 12 }}>
      {props.items.map((item) => (
        <PinboardItem
          key={item.id}
          id={item.id}
          description={item.description}
          title={item.title}
          physSymptoms={item.physSymptoms}
          mentSymptoms={item.mentSymptoms}
          emotionColour={item.emotionColour}
        />
      ))}
    </Grid>
  );
};

export default PinboardLayout;
