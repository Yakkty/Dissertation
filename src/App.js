import React from "react";
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

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/posts/new" exact>
          <NewPost /> 
        </Route>
        <Route path="/todolist" exact>
          <ToDoList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
