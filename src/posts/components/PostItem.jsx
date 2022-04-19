//This component displays an individual post to be displayed in the post list parent component

//Imports
import React, { useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./PostItem.css";

const PostItem = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();
  //Handler function for deleting posts
  const confirmDeleteHandler = async () => {
    //on delete function called here but executed in parent component, passing the post id as a parameter
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/posts/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  //This displays the markup for a post
  //This is a list element displaying an image, title and description
  //The delete function is bound to the onClick of the  delete button
  //The edit button links a user to an update post form, with the url dynamically set to include the post id as a parameter
  return (
    <li className="post-item">
      <Card className="post-item__content">
        <div className="post-item__image">
          <img
            src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
            alt={props.title}
          />
        </div>
        <div className="post-item__data">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className="post-item__actions">
          <Button to={`/posts/${props.id}`}>EDIT</Button>
          <Button inverse onClick={confirmDeleteHandler}>
            DELETE
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default PostItem;
