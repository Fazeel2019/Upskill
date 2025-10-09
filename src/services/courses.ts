
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import type { Course } from "@/lib/data";

type NewCourse = Omit<Course, 'id' | 'createdAt'>;

export const addCourse = async (courseData: NewCourse) => {
    try {
        const coursesCollection = collection(db, "courses");
        await addDoc(coursesCollection, {
            ...courseData,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding course: ", error);
        throw new Error("Could not add course");
    }
}

export const updateCourse = async (courseId: string, courseData: Partial<Course>) => {
    try {
        const courseDoc = doc(db, "courses", courseId);
        await updateDoc(courseDoc, courseData);
    } catch (error) {
        console.error("Error updating course: ", error);
        throw new Error("Could not update course");
    }
};

export const deleteCourse = async (courseId: string) => {
    try {
        const courseDoc = doc(db, "courses", courseId);
        await deleteDoc(courseDoc);
    } catch (error) {
        console.error("Error deleting course: ", error);
        throw new Error("Could not delete course");
    }
}

export const getCourse = async (courseId: string): Promise<Course | null> => {
    try {
        const courseDoc = doc(db, "courses", courseId);
        const docSnap = await getDoc(courseDoc);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Course;
        }
        return null;
    } catch (error) {
        console.error("Error getting course:", error);
        throw new Error("Could not retrieve course");
    }
}

export const listenToCourses = (callback: (courses: Course[]) => void) => {
  const coursesCollection = collection(db, "courses");
  const q = query(coursesCollection, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const courses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Course));
    callback(courses);
  }, (error) => {
      console.error("Error listening to courses:", error);
  });

  return unsubscribe;
};
