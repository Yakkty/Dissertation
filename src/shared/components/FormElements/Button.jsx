//This is a reusable button component

//Imports
import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

//This button accepts props, which can be used to configure the button in components its utilised in
const Button = (props) => {
  //if checks if the button is to accept a "href", or a "to" property
  //Props children displays all content which is a child to this component i.e the button text
  //if the button has an href, return a hyperlink tag
  if (props.href) {
    return (
      <a
        className={`button ${props.inverse && "button-inverse"} ${
          props.className
        }`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  //If the button receives a to prop, return a react router dom Link element
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button ${props.inverse && "button-inverse"} ${
          props.className
        }`}
      >
        {props.children}
      </Link>
    );
  }

  //Return the button, which the type property determines if it is a hyperlink or a Link
  return (
    <button
      className={`button ${props.inverse && "button-inverse"} ${
        props.className
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
