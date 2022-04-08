import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PostItem from "./PostItem";
import "./PostList.css";

const PostList = (props) => {
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
          image={post.imageUrl}
          title={post.title}
          description={post.description}
          creatorId={post.creator}
        />
      ))}
    </ul>
  );
};

export default PostList;
