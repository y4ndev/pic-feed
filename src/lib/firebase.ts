// utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getDatabase, type Database } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: "pic-feed-7f694",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Инициализируем приложение один раз
const app = initializeApp(firebaseConfig);

// Экспортируем auth
const auth: Auth = getAuth(app);

// Инициализируем и экспортируем Realtime Database
const db: Database = getDatabase(app);
console.log("FIREBASE CONFIG:", firebaseConfig);
export { auth, db };
