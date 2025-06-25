import React from "react";
import { subscribeToPosts } from "@/lib/dbPosts";
import { useState, useEffect } from "react";
import styles from "./UserPost.module.scss";
import { Post } from "@/lib/dbPosts";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToPosts(setPosts);
    return () => unsubscribe(); // очистка при размонтировании
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded shadow-sm">
          <p>{post.text}</p>
          {post.image && (
            <img src={post.image} alt="Post image" className="mt-2 max-w-full rounded" />
          )}
          <div className="text-xs text-gray-500 mt-1">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
