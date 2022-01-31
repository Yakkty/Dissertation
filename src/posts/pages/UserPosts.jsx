import React from "react";

import PostList from "../components/PostList";

const DUMMY_POSTS = [
    {
        id: "p2",
        title: "Test Title v1",
        description: "Test Description v1",
        imageUrl: "https://reactjs.org/logo-og.png",
        creator: "u1"
    },
    {
        id: "p",
        title: "Test Title v1",
        description: "Test Description v1",
        imageUrl: "https://reactjs.org/logo-og.png",
        creator: "u2"
    }

];

const UserPosts = () => {
    return <PostList items={DUMMY_POSTS} />;
};

export default UserPosts;