import React from "react";

import TDList from "../components/TDList";

const ToDoList = () => {
  const ITEMS = [
    { id: "i1", value: "Service car" },
    { id: "i2", value: "Fix sink" },
    { id: "i3", value: "Cut grass" },
    { id: "i4", value: "Eat lunch" },
 
  ];
  return <TDList items={ITEMS} />;
};

export default ToDoList;
