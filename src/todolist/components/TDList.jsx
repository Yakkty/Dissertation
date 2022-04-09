import React, { useState } from "react";

import ListItem from "./ListItem";

import "./TDList.css";

const TDList = (props) => {
  const [item, setItem] = useState("");

  const itemChangeHandler = (event) => {
    setItem(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(item);
  };
  return (
    <div className="box">
      <div>
        <h1>To Do List</h1>
      </div>
      <div className="list-item-box">
        {props.items.map((item) => (
          <ListItem key={item.id} id={item.id} value={item.value} />
        ))}
        <form className="form-item__submit" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="New Item"
            onChange={itemChangeHandler}
          ></input>
          <button type="submit">+</button>
        </form>
      </div>
    </div>
  );
};

export default TDList;

// return (
//   <div className="box">
//     <div className="list-header">
//       <h1>To Do List</h1>
//     </div>
//     <form className="list-item">
//       <Card className="list-item__content">
//         <div>
//           <ul className="td-list">
//             {props.items.map((item) => (
//               <ListItem key={item.id} id={item.id} value={item.value} />
//             ))}
//           </ul>
//         </div>
//       </Card>
//     </form>
//   </div>
// );
