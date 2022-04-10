//This component is responsible for the navbar links.
//This allows a user to navigate around the website with button clicks instead of manually typing urls

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

//This renders each button on the navbar, and will then link to various urls depending on which button is clicked
const NavLinks = (props) => {
  //Context is used here to gain access to the users logged in status, and will render different content accordingly
  const auth = useContext(AuthContext);

  //If a user is logged in, every button except login will be displayed
  //If a user is not logged in, they will only have access to the login button
  //Content here is displayed with the logical && operator
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>

      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/posts">Posts</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/posts/new">Add Post</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/Calendar">Calendar</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/pinboard">Pinboard</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/todolist">ToDoList</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
