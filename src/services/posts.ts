

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, type Timestamp, doc, deleteDoc, runTransaction, arrayUnion, arrayRemove, increment } from "firebase/firestore";

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
  likeCount?: number;
  likedBy?: string[];
  commentCount?: number;
};

type NewPost = Omit<Post, 'id' | 'timestamp' | 'likeCount' | 'likedBy' | 'commentCount'>;

export const addPost = async (postData: NewPost) => {
  try {
    const postsCollection = collection(db, "posts");
    await addDoc(postsCollection, {
      ...postData,
      timestamp: serverTimestamp(),
      likeCount: 0,
      likedBy: [],
      commentCount: 0,
    });
  } catch (error) {
    console.error("Error adding post: ", error);
    throw new Error("Could not add post");
  }
};

export const deletePost = async (postId: string) => {
    try {
        const postDoc = doc(db, "posts", postId);
        await deleteDoc(postDoc);
    } catch (error) {
        console.error("Error deleting post: ", error);
        throw new Error("Could not delete post");
    }
};

export const toggleLike = async (postId: string, userId: string) => {
    const postRef = doc(db, "posts", postId);
    try {
        await runTransaction(db, async (transaction) => {
            const postDoc = await transaction.get(postRef);
            if (!postDoc.exists()) {
                throw "Post does not exist!";
            }

            const post = postDoc.data() as Post;
            const isLiked = post.likedBy?.includes(userId);
            
            if (isLiked) {
                transaction.update(postRef, {
                    likeCount: increment(-1),
                    likedBy: arrayRemove(userId)
                });
            } else {
                 transaction.update(postRef, {
                    likeCount: increment(1),
                    likedBy: arrayUnion(userId)
                });
            }
        });
    } catch (error) {
        console.error("Error toggling like: ", error);
        throw new Error("Could not update like");
    }
}

export const incrementCommentCount = async (postId: string) => {
    const postRef = doc(db, "posts", postId);
    try {
        await runTransaction(db, async (transaction) => {
            const postDoc = await transaction.get(postRef);
            if (!postDoc.exists()) {
                throw "Post does not exist!";
            }
            transaction.update(postRef, {
                commentCount: increment(1)
            });
        });
    } catch (error) {
        console.error("Error incrementing comment count: ", error);
        throw new Error("Could not update comment count");
    }
}


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

    