"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Feed = () => {
  const router = useRouter();

  const handleProfile = () => {
    router.push("../dashboard");
  };
  return (
    <div>
      Лента картинок
      <button onClick={handleProfile}>Профиль</button>
    </div>
  );
};

export default Feed;
