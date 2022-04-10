//This component is responsible for updating post data

//imports
import React, { Fragment, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";

import "./PostForm.css";

const DUMMY_POSTS = [
  {
    id: "p1",
    title: "Test Title v1",
    description: "Test Description v1",
    imageUrl: "https://reactjs.org/logo-og.png",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Test Title v2",
    description: "Test Description v2",
    imageUrl: "https://reactjs.org/logo-og.png",
    creator: "u2",
  },
];

//This component renders a form containing post data
//This component then takes user inputs to update the existing post data
const UpdatePost = () => {
  //useState call to initialise post data
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });
  //Get access to the post id from the url parameters
  const postId = useParams().postId;

  const history = useHistory();

  const post = DUMMY_POSTS.find((p) => p.id === postId);

  //This useEffect call renders post data on page load
  useEffect(() => {
    try {
      setPostData({
        title: post.title,
        description: post.description,
      });
    } catch (err) {
      console.log(err);
    }
  }, [post.title, post.description, setPostData]);

  //Display header if no post was found
  if (!postData) {
    return (
      <div className="center">
        <h2>Could not find post</h2>
      </div>
    );
  }

  //Handler functions to store user inputs into state
  const updateTitleHandler = (event) => {
    setPostData({
      ...postData,
      title: event.target.value,
    });
  };

  const updateDescriptionHandler = (event) => {
    setPostData({
      ...postData,
      description: event.target.value,
    });
  };

  //Form submission function
  const submitHandler = (event) => {
    //event prevent default prevents page reload on form submission
    event.preventDefault();

    //Redirect user after submission
    history.push("/u1/posts");
    console.log(postData);
  };

  //HTML markup of the form, consisting of two inputs
  //Value is set to the post data state, with its onChange to functions that update the state which updates the values
  //This is known as two way binding
  return (
    <Fragment>
      {postData && (
        <form className="post-form" onSubmit={submitHandler}>
          <Input
            element="input"
            type="text"
            label="Title"
            value={postData.title}
            onChange={updateTitleHandler}
          />
          <Input
            element="textarea"
            type="text"
            label="Description"
            value={postData.description}
            onChange={updateDescriptionHandler}
          />

          <Button type="submit">Register</Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdatePost;
