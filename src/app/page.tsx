"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("./feed");
      } else {
        router.push("./login");
      }

      return () => unsubscribe();
    });
  }, [router]);
  return (
    <main className={styles.main}>
      <h1>Добро пожаловать! Делитесь своими картинками</h1>
    </main>
  );
}
