//This is the parent component relating to users posts

//Imports
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PostList from "../components/PostList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { useHttp } from "../../shared/components/hooks/http-hook";

const UserPosts = () => {
   //Gain access to our custom useHttp hook methods
  const { sendRequest, error, clearError } = useHttp();
  //useState call to store posts
  const [posts, setPosts] = useState();
  //get user id from url parameters
  const userId = useParams().uid;

  //Use effect call to display all posts correlating to a user
  useEffect(() => {
    const fetchPosts = async () => {
      //http GET request sent to the rest api backend to retreive all posts for a specific user
      //This is using the fetch api
      try {
        const responseData = await sendRequest(
          //Dynamically set url to only fetch posts for a specific user id
          //Url also set to an environment variable as this is production code
          `${process.env.REACT_APP_API_URL}/posts/user/${userId}`
        );
        //Store these posts into state
        setPosts(responseData.userPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [sendRequest, userId]);

  //Display a card if no posts are found, allowing users to be redirected to the new posts page
  if (!posts) {
    return (
      <div className="post-list center">
        <Card>
          <h2>No Posts found. Create a new one</h2>
          <Button to="/posts/new">Add new</Button>
        </Card>
      </div>
    );
  }

  //Handler function for removing posts from the post data state
  //This function is for re-rendering the ui
  const deletePostHandler = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  //This displays the post list component, passing the users posts and relevant functions to it
  //Error modal is displayed if errors are present
  return (
    <Fragment>
      {error && posts && <ErrorModal error={error} onClear={clearError} />}

      {posts && <PostList items={posts} onDeletePost={deletePostHandler} />}
    </Fragment>
  );
};

export default UserPosts;
