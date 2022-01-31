import React from "react";



import "./ListItem.css";

const ListItem = (props) => {
  return (
    <div className="list-item">
      <input type="radio"></input>
      <p>{props.value}</p>
    </div>
  );
};

export default ListItem;
