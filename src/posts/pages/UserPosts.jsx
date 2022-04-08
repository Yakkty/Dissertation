import React from "react";
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
    id: "p2",
    title: "Test Title v2",
    description: "Test Description v2",
    imageUrl: "https://reactjs.org/logo-og.png",
    creator: "u2",
  },
];

const UserPosts = () => {
  const userId = useParams().uid;

  const userPosts = DUMMY_POSTS.filter(post => post.creator === userId);
  return <PostList items={userPosts} />;
};

export default UserPosts;
