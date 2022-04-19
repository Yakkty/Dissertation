//App.js is the parent overall parent component of this single page application
//This page is responsible for managing authentication state and routing

//Imports
import React, { useState, useCallback, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import "./App.css";

import Home from "./home/pages/Home";
// import NewPost from "./posts/pages/NewPost";
// import ToDoList from "./todolist/pages/ToDoList";
// import UserPosts from "./posts/pages/UserPosts";
// import UpdatePost from "./posts/pages/UpdatePost";
// import Authenticate from "./user/pages/Auth";
// import Signup from "./user/pages/Signup";
// import Calendar from "./calendar/pages/Calendar";
// import Pinboard from "./pinboard/pages/Pinboard";
// import NewCalendarItem from "./calendar/pages/NewCalendarItem";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

//Changing imports to improve page performance - code splitting
//React lazy will download pages when they are reached rather than on initial page load
const Calendar = React.lazy(() => import("./calendar/pages/Calendar"));
const NewCalendarItem = React.lazy(() =>
  import("./calendar/pages/NewCalendarItem")
);
const Pinboard = React.lazy(() => import("./pinboard/pages/Pinboard"));
const ToDoList = React.lazy(() => import("./todolist/pages/ToDoList"));
const UserPosts = React.lazy(() => import("./posts/pages/UserPosts"));
const UpdatePost = React.lazy(() => import("./posts/pages/UpdatePost"));
const NewPost = React.lazy(() => import("./posts/pages/NewPost"));
const Authenticate = React.lazy(() => import("./user/pages/Auth"));
const Signup = React.lazy(() => import("./user/pages/Signup"));

let logoutTimer;

const App = () => {
  //useState calls for a users authentication state
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  //Login function. This function binds a token to a user which is used to gain access to the rest of the application
  //useCallback is utilised here so the login function doesn't recreate on component re-renders
  const login = useCallback((uid, token, expirationDate) => {
    //Storing the token and user id in state
    setToken(token);
    setUserId(uid);

    //Create an expiration time one hour from token creation or set it to existing expiration date
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    //Setting the expiration date in state
    setTokenExpirationDate(tokenExpiration);
    //Storing the authentication token and expiration in local storage
    //This allows users to stay logged in for a duration, without having to login on every page reload
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  //Logout function to log a user out. This removes the authentication token from the user and removes the expiration timer
  //along with removing the user data from local storage
  //Logout is also in a usecallback hook to prevent it being recreated on component re-renders
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  //This function is used to calculate the expiration time of the token, and automatically log a user out once when the time is up
  //Checking if a token exists (the user has logged in) along with there being an expiration date
  //This function will run once on page render, and any time the token, logout function or token expiration date changes
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const tokenDuration =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, tokenDuration);
    } else {
      //Clear the timer if there is no token or expiration date
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  //This useEffect call is what will automatically log a user in
  //if the storage data has a valid token and valid token expiration timer
  //This will only be called on the pages initial render, and whenever login changes
  useEffect(() => {
    //Parse the data from local storage
    const storageData = JSON.parse(localStorage.getItem("userData"));
    if (
      storageData &&
      storageData.token &&
      //Token is valid if expiration date is in the future still
      new Date(storageData.expiration) > new Date()
    ) {
      //Login function call
      login(
        storageData.userId,
        storageData.token,
        new Date(storageData.expiration)
      );
    }
  }, [login]);

  //This section is focused on routing for the page using react-router-dom
  //Page content will rerender depending on the provided url path
  let routes;

  //If checks for a users authentication status
  //Route availability is dependent on a users authenticated status
  if (!token) {
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
  //Wrap routes with Suspense for this page load code splitting to work
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <h2>Page Loading</h2>
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
