//This is a reusable card component

//Imports
import React from "react";

import "./Card.css";

//Card is a UI element which displays a content and actions about a particular subject
const Card = (props) => {
  return (
    //Styling the card with card specific styling, along with allowing the option to dynamically style the card in individual components
    //By being able to receive props to set styles
    //Props.children allows for content put inside the card to be shown
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
