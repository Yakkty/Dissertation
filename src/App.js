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
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

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
        <Route path="/" exact></Route>
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
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
