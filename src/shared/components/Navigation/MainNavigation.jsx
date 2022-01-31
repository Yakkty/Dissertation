import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/BackDrop";
import "./MainNavigation.css";


const MainNavigation = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const OpenDrawer = () => {
      setOpenDrawer(true);
  };

  const CloseDrawer = () => {
      setOpenDrawer(false);
  }

  return (
    <React.Fragment>
    {openDrawer && <Backdrop onClick={CloseDrawer}/>}
      {openDrawer && (
        <SideDrawer onClick={CloseDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={OpenDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Test</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
