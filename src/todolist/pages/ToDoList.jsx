import React from "react";
import { useParams } from "react-router-dom";

import TDList from "../components/TDList";

const ITEMS = [
  { id: "i1", value: "Service car", creator: "u1" },
  { id: "i2", value: "Fix sink", creator: "u1" },
  { id: "i3", value: "Service car", creator: "u1" },
  { id: "i4", value: "Fix sink", creator: "u1" },
  { id: "i5", value: "Service car", creator: "u1" },
  { id: "i6", value: "Fix sink", creator: "u1" },
  { id: "i7", value: "Cut grass", creator: "u2" },
  { id: "i8", value: "Eat lunch", creator: "u2" },
];

const ToDoList = () => {
  const userId = useParams().uid;
  const userItems = ITEMS.filter((item) => item.creator === userId);
  return <TDList items={userItems} />;
};

export default ToDoList;
