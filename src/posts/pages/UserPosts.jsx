//This is the parent component relating to users posts

//Imports
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import PostList from "../components/PostList";

const DUMMY_POSTS = [
  {
    id: "p1",
    title: "Test Title v1",
    description: "Test Description v1",
    imageUrl: "https://reactjs.org/logo-og.png",
    creator: "u1",
  },
  {
    id: "p3",
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

const UserPosts = () => {
  //useState call to store posts
  const [posts, setPosts] = useState();
  //get user id from url parameters
  const userId = useParams().uid;

  //Handler function for removing posts from the post data state
  //This function is for re-rendering the ui
  const deletePostHandler = (deletedPostId) => {
    console.log(deletedPostId);
  };

  const userPosts = DUMMY_POSTS.filter((post) => post.creator === userId);

  //This displays the post list component, passing the users posts and relevant functions to it
  return <PostList items={userPosts} onDeletePost={deletePostHandler} />;
};

export default UserPosts;
