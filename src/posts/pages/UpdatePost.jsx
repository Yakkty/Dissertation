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
  //Gain access to our auth context
  const auth = useContext(AuthContext);
  //Gain access to our custom useHttp hook methods
  const { sendRequest, error, clearError } = useHttp();
  //useState call to initialise post data
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });
  //Get access to the post id from the url parameters
  const postId = useParams().postId;

  const history = useHistory();

  //This useEffect call renders post data on page load, or when its dependancies change
  useEffect(() => {
    const fetchPost = async () => {
      //function call using the fetch api to send a GET request to our rest api backend
      //Dynamically set url to only fetch the post with the correct post id
      //This will fill out the form with the correct post data
      try {
        const responseData = await sendRequest(
          //Url set to environment variable as this is production code
          `${process.env.REACT_APP_API_URL}/posts/${postId}`
        );
        //Store this response data into state
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
    //Send a http PATCH request to our rest api backend using the fetch api
    //Dynamically set url to only update the post with the correct post id
    try {
      await sendRequest(
        //Url set to environment variable due to this being production code
        `${process.env.REACT_APP_API_URL}/posts/${postId}`,
        "PATCH",
        //Convert data into json as this is what the backend requires
        //Provide the user inputted data, which is stored into state, to the request body
        JSON.stringify({
          title: postData.title,
          description: postData.description,
        }),
        //Set headers, app/json to notify the backend to expect json data
        //Auth header set for security reasons, only users with valid tokens can send these requests
        //Therefore the token is passed
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      //Redirect user after submission
      history.push(`/${auth.userId}/posts`);
    } catch (err) {
      console.log(err);
    }
  };

  //HTML markup of the form, consisting of two inputs and a submit button
  //Value is set to the post data state, with its onChange to functions that update the state which updates the values
  //This is known as two way binding
  //Error modal displayed if errors are present
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
