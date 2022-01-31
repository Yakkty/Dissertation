import React from "react";

import ListItem from "./ListItem";


import "./TDList.css";

const TDList = (props) => {
  return (
    <div className="box">
      <div>
        <h1 className="list-header">To Do List</h1>
    
      </div>
      <div className="list-item-box">
        <form>
          {props.items.map((item) => (
            <ListItem key={item.id} id={item.id} value={item.value} />
          ))}
        </form>
        <form className="form-item__submit">
          <input type="text" placeholder="New Item"></input>
          <button type="text" className="list-form-button">+</button>
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
