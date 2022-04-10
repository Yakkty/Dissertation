//This component is an element which renders alongside a modal to prevent interaction with the rest of the website whilst the modal is active
//This component uses React portals to render outside of the DOM tree, but can be displayed wherever needed
//This component receives a function as props to allow for closing of the model on click of the background

import React from "react";
import ReactDOM from "react-dom";

import "./BackDrop.css";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
