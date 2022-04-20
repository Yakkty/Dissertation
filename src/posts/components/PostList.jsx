//This component is responsible for displaying a list of posts, which is dynamically set
//This is achieved by calling the array.map method on the post data, and mapping each post in the array to
//a child element that receives all required data and functions via props

//Imports
import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PostItem from "./PostItem";
import "./PostList.css";

const PostList = (props) => {
  //if no posts found, display a box to allow users to add new posts
  if (props.items.length === 0) {
    return (
      <div className="post-list center">
        <Card>
          <h2>No Posts found. Create a new one</h2>
          <Button to="/posts/new">Add new</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="post-list">
      {props.items.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          image={post.image}
          title={post.title}
          description={post.description}
          creatorId={post.creator}
          onDelete={props.onDeletePost}
        />
      ))}
    </ul>
  );
};

export default PostList;
