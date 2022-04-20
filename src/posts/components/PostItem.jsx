//This component displays an individual post to be displayed in the post list parent component

//Imports
import React, { useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./PostItem.css";

const PostItem = (props) => {
  //Gain access to our auth context
  const auth = useContext(AuthContext);
  //Gain access to the sendrequest method from our custom useHttp hook
  const { sendRequest } = useHttp();

  //Handler function for deleting posts
  //This function uses the fetch api to call a DELETE request to our rest api backend
  //The url contains a dynamic segment, passing the post id to correctly identify which post to delete
  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        //Environment variable for the url as this is production code.
        `${process.env.REACT_APP_API_URL}/posts/${props.id}`,
        "DELETE",
        null,
        //An authorization header is set, passing the token. This is an added step of security.
        //Only users with a token are able to send these http requests
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      //on delete function called here but executed in parent component, passing the post id as a parameter
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
