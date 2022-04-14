//This component is responsible for updating post data

//imports
import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/components/hooks/http-hook";

import "./PostForm.css";

//This component renders a form containing post data
//This component then takes user inputs to update the existing post data
const UpdatePost = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, error, clearError } = useHttp();
  //useState call to initialise post data
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });
  //Get access to the post id from the url parameters
  const postId = useParams().postId;

  const history = useHistory();

  //This useEffect call renders post data on page load
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/${postId}`
        );
        setPostData({
          title: responseData.post.title,
          description: responseData.post.description,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [sendRequest, postId]);

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
  const submitHandler = async (event) => {
    //event prevent default prevents page reload on form submission
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${postId}`,
        "PATCH",
        JSON.stringify({
          title: postData.title,
          description: postData.description,
        }),
        { "Content-Type": "application/json" }
      );
      //Redirect user after submission
      history.push(`/${auth.userId}/posts`);
    } catch (err) {
      console.log(err);
    }
  };

  //HTML markup of the form, consisting of two inputs
  //Value is set to the post data state, with its onChange to functions that update the state which updates the values
  //This is known as two way binding
  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
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
