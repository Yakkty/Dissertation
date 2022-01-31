import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/posts">Posts</NavLink>
      </li>
      <li>
        <NavLink to="/posts/new">Add Post</NavLink>
      </li>
      <li>
        <NavLink to="/Calendar">Calendar</NavLink>
      </li>
      <li>
        <NavLink to="/pinboard">Pinboard</NavLink>
      </li>
      <li>
        <NavLink to="/todolist">ToDoList</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Authenticate</NavLink>
      </li>
      <li>
        <NavLink to="/">Logout</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
