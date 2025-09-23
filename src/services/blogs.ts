
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import type { Blog } from "@/lib/data";

type NewBlog = Omit<Blog, 'id' | 'createdAt'>;

export const addBlog = async (blogData: NewBlog) => {
    try {
        const blogsCollection = collection(db, "blogs");
        await addDoc(blogsCollection, {
            ...blogData,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding blog: ", error);
        throw new Error("Could not add blog post");
    }
};

export const updateBlog = async (blogId: string, blogData: Partial<Blog>) => {
    try {
        const blogDoc = doc(db, "blogs", blogId);
        await updateDoc(blogDoc, blogData);
    } catch (error) {
        console.error("Error updating blog: ", error);
        throw new Error("Could not update blog post");
    }
};

export const deleteBlog = async (blogId: string) => {
    try {
        const blogDoc = doc(db, "blogs", blogId);
        await deleteDoc(blogDoc);
    } catch (error) {
        console.error("Error deleting blog: ", error);
        throw new Error("Could not delete blog post");
    }
};

export const getBlog = async (blogId: string): Promise<Blog | null> => {
    try {
        const blogDoc = doc(db, "blogs", blogId);
        const docSnap = await getDoc(blogDoc);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Blog;
        }
        return null;
    } catch (error) {
        console.error("Error getting blog post:", error);
        throw new Error("Could not retrieve blog post");
    }
}

export const listenToBlogs = (callback: (blogs: Blog[]) => void) => {
  const blogsCollection = collection(db, "blogs");
  const q = query(blogsCollection, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const blogs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Blog));
    callback(blogs);
  }, (error) => {
    console.error("Error listening to blogs:", error);
  });

  return unsubscribe;
};
