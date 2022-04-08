//This is a child component to main navigation
//This component wraps the navbars header, along with the navigation links
// props.children will display all content that is a child component to main header

import React from "react";

import "./MainHeader.css";

const MainHeader = (props) => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
