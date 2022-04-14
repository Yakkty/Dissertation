//App.js is the parent overall parent component of this single page application
//This page is responsible for managing authentication state and routing

//Imports
import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import "./App.css";

import Home from "./home/pages/Home";
import NewPost from "./posts/pages/NewPost";
import ToDoList from "./todolist/pages/ToDoList";
import UserPosts from "./posts/pages/UserPosts";
import UpdatePost from "./posts/pages/UpdatePost";
import Authenticate from "./user/pages/Auth";
import Signup from "./user/pages/Signup";
import Calendar from "./calendar/pages/Calendar";
import Pinboard from "./pinboard/pages/Pinboard";
import NewCalendarItem from "./calendar/pages/NewCalendarItem";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  //useState calls for a users authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  //Login function. This function binds a token to a user which is then used to gain access to the rest of the application
  //useCallback is called here to prevent recreation of the login function, empty dependancies means itll only render once.
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  //Logout function to log a user out. This removes the authentication token from the user
  //useCallback also used here to prevent recreation on componnent re-renders. Same logic as for Login
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  //This section is focused on routing for the page using react-router-dom
  //Page content will rerender depending on the provided url path
  let routes;

  //If checks for a users authentication status
  //Route availability is dependent on a users authenticated status
  if (!isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth" exact>
          <Authenticate />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/" exact />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/:uid/posts" exact>
          <UserPosts />
        </Route>
        <Route path="/posts/new" exact>
          <NewPost />
        </Route>
        <Route path="/posts/:postId" exact>
          <UpdatePost />
        </Route>
        <Route path="/:uid/todolist" exact>
          <ToDoList />
        </Route>
        <Route path="/pinboard" exact>
          <Pinboard />
        </Route>
        <Route path="/:uid/calendar" exact>
          <Calendar />
        </Route>
        <Route path="/calendar/new" exact>
          <NewCalendarItem />
        </Route>
        <Redirect to="/" exact />
      </Switch>
    );
  }

  //Context is used here to manage app wide state.
  //In this case its focused on a users authenticated state
  //The context provider is used here to pass this authentication state to every child component
  //The provider wrapper wraps the entire website in this case, resulting in the entire website having access to the context
  //This context consists of a token, userId and login/logout functions
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
