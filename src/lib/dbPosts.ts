import { ref, push, get, onValue, off } from "firebase/database";
import { db, auth } from "./firebase";

// Тип поста
export interface Post {
  id?: string;
  text: string;
  image?: string | null;
  createdAt: number;
  userId: string;
}

// Добавление поста
export const addPost = async ({ text, image }: { text: string; image?: string }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Пользователь не авторизован");

  const postRef = ref(db, "posts");
  await push(postRef, {
    text,
    image: image ?? null,
    createdAt: Date.now(),
    userId: user.uid,
  });
};

// Получение всех постов (одноразово)
export const getPosts = async (): Promise<Post[]> => {
  const snapshot = await get(ref(db, "posts"));
  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  return Object.entries(data).map(([id, value]) => ({
    id,
    ...(value as Post),
  }));
};

// Подписка на посты в реальном времени
export const subscribeToPosts = (callback: (posts: Post[]) => void): (() => void) => {
  const postRef = ref(db, "posts");
  const handler = (snapshot: any) => {
    const data = snapshot.val();
    const posts: Post[] = data
      ? Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Post),
        }))
      : [];
    callback(posts.reverse()); // по убыванию времени
  };

  onValue(postRef, handler);

  // функция отписки
  return () => off(postRef, "value", handler);
};
