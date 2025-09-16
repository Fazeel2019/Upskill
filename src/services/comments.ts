
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, type Timestamp } from "firebase/firestore";
import { incrementCommentCount } from "./posts";

export interface Comment {
  id: string;
  author: {
    uid: string;
    name: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: Timestamp;
};

export type NewComment = Omit<Comment, 'id' | 'timestamp'>;

export const addComment = async (postId: string, commentData: NewComment) => {
    try {
        const commentsCollection = collection(db, "posts", postId, "comments");
        await addDoc(commentsCollection, {
            ...commentData,
            timestamp: serverTimestamp(),
        });
        await incrementCommentCount(postId);
    } catch (error) {
        console.error("Error adding comment: ", error);
        throw new Error("Could not add comment");
    }
};

export const listenToComments = (postId: string, callback: (comments: Comment[]) => void) => {
    const commentsCollection = collection(db, "posts", postId, "comments");
    const q = query(commentsCollection, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const comments = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Comment));
        callback(comments);
    }, (error) => {
        console.error("Error listening to comments: ", error);
    });
    
    return unsubscribe;
}
