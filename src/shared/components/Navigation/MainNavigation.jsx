//This is the parent component that is responsible for the navigation bar
//This component displays the navigations title, and the respective navigation links

import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <MainHeader>
      <h1 className="main-navigation__title">
        <Link to="/">Impetus</Link>
      </h1>
      <nav className="main-navigation__header-nav">
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
