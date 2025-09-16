'use server';
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, type Timestamp } from "firebase/firestore";

export type Post = {
  id?: string;
  author: {
    uid: string;
    name: string;
    avatarUrl: string;
  };
  content: string;
  category: "STEM" | "Healthcare" | "Public Health";
  timestamp: Timestamp;
  likes?: number;
  comments?: number;
};

type NewPost = Omit<Post, 'id' | 'timestamp'>;

export const addPost = async (postData: NewPost) => {
  try {
    const postsCollection = collection(db, "posts");
    await addDoc(postsCollection, {
      ...postData,
      timestamp: serverTimestamp(),
      likes: 0,
      comments: 0,
    });
  } catch (error) {
    console.error("Error adding post: ", error);
    throw new Error("Could not add post");
  }
};

export const listenToPosts = (callback: (posts: Post[]) => void) => {
  const postsCollection = collection(db, "posts");
  const q = query(postsCollection, orderBy("timestamp", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Post));
    callback(posts);
  }, (error) => {
    console.error("Error listening to posts:", error);
  });

  return unsubscribe;
};
