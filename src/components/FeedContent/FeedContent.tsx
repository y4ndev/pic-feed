import React, { useEffect, useState } from "react";
import styles from "./FeedContent.module.scss";
import NewPostForm from "../NewPostForm/NewPostForm";
import PostList from "../PostList/PostList";
const FeedContent = () => {
  return (
    <div className={styles.inner}>
      <div className={styles.feed}>
        <PostList />
        <NewPostForm />
      </div>
    </div>
  );
};

export default FeedContent;
