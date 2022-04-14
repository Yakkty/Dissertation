//This is the parent component relating to users posts

//Imports
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import PostList from "../components/PostList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { useHttp } from "../../shared/components/hooks/http-hook";

const UserPosts = () => {
  const { sendRequest, error, clearError } = useHttp();
  //useState call to store posts
  const [posts, setPosts] = useState();
  //get user id from url parameters
  const userId = useParams().uid;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/user/${userId}`
        );
        setPosts(responseData.userPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [sendRequest, userId]);

  //Handler function for removing posts from the post data state
  //This function is for re-rendering the ui
  const deletePostHandler = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  //This displays the post list component, passing the users posts and relevant functions to it
  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {posts && <PostList items={posts} onDeletePost={deletePostHandler} />}
    </Fragment>
  );
};

export default UserPosts;
