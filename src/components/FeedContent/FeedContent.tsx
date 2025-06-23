import React from "react";
import styles from "./FeedContent.module.scss";
import UserPost from "../UserPost/UserPost";
import NewPostForm from "../NewPostForm/NewPostForm";

const FeedContent = () => {
  return (
    <div className={styles.inner}>
      <div className={styles.feed}>
        <UserPost />
        <NewPostForm />
      </div>
    </div>
  );
};

export default FeedContent;
