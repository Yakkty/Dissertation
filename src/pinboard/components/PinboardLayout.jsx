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
          preview={item.preview}
          title={item.title}
          content={item.content}
        />
      ))}
    </Grid>
  );
};

export default PinboardLayout;
