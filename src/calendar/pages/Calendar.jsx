import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import CalendarList from "../components/CalendarList";

import "./Calendar.css";

const DUMMY_ITEMS = [
  {
    id: "i1",
    title: "Lunch with boss",
    description:
      "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
    date: "10/4/2022",
    time: "14:05",
    creator: "u1",
  },
  {
    id: "i2",
    title: "Lunch with boss again",
    description:
      "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
    date: "11/4/2022",
    time: "14:05",
    creator: "u1",
  },
  {
    id: "i3",
    title: "Lunch with bosses daughter",
    description:
      "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
    date: "12/4/2022",
    time: "14:05",
    creator: "u1",
  },
  {
    id: "i4",
    title: "Lunch with bosses daughter",
    description:
      "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
    date: "12/4/2022",
    time: "14:05",
    creator: "u1",
  },
  // {
  //   id: "i5",
  //   title: "Lunch with boss",
  //   description:
  //     "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
  //   date: "10/4/2022",
  //   time: "14:05",
  //   creator: "u1",
  // },
  // {
  //   id: "i6",
  //   title: "Lunch with boss again",
  //   description:
  //     "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
  //   date: "11/4/2022",
  //   time: "14:05",
  //   creator: "u1",
  // },
  // {
  //   id: "i7",
  //   title: "Lunch with bosses daughter",
  //   description:
  //     "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
  //   date: "12/4/2022",
  //   time: "14:05",
  //   creator: "u1",
  // },
  // {
  //   id: "i8",
  //   title: "Lunch with bosses daughter",
  //   description:
  //     "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
  //   date: "12/4/2022",
  //   time: "14:05",
  //   creator: "u1",
  // },
];

const Calendar = () => {
  const userId = useParams().uid;

  const userItems = DUMMY_ITEMS.filter((item) => item.creator === userId);
  return (
    <Fragment>
      <Card className="Calendar-card">
        <CalendarList items={userItems} />
      </Card>
      <Card className="Calendar-card__new">
        <h2>Add a new Calendar Item</h2>
        <Button className="Calendar-card__button" to="/calendar/new">
          Add
        </Button>
      </Card>
    </Fragment>
  );
};

export default Calendar;
