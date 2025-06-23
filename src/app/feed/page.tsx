"use client";

import FeedContent from "@/components/FeedContent/FeedContent";
import { useRouter } from "next/navigation";
import React from "react";

const Feed = () => {
  const router = useRouter();

  const handleProfile = () => {
    router.push("../dashboard");
  };
  return (
    <div className="feed">
      Лента картинок
      <button onClick={handleProfile}>Профиль</button>
      <FeedContent />
    </div>
  );
};

export default Feed;
