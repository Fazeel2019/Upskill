
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";
import type { Resource } from "@/lib/data";

export interface CourseProgress {
    resource: Resource;
    progress: number; // Percentage
}

export interface UserProgress {
  lastResourceId?: string;
  courses?: { [resourceId: string]: CourseProgress };
  updatedAt: Timestamp;
}

export const enrollInCourse = async (uid: string, resource: Resource) => {
    const progressRef = doc(db, "userProgress", uid);
    const progressDoc = await getDoc(progressRef);
    
    const newCourseData: CourseProgress = {
        resource,
        progress: 0
    };

    if (progressDoc.exists()) {
        await setDoc(progressRef, {
            courses: {
                [resource.id]: newCourseData
            },
            updatedAt: serverTimestamp(),
        }, { merge: true });
    } else {
         await setDoc(progressRef, {
            courses: {
                [resource.id]: newCourseData
            },
            updatedAt: serverTimestamp(),
        });
    }
};

export const updateUserProgress = async (uid: string, data: Partial<Omit<UserProgress, 'updatedAt'>> & { lastResourceId: string }) => {
  const progressRef = doc(db, "userProgress", uid);
  try {
    await setDoc(progressRef, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error updating user progress:", error);
    throw new Error("Could not update user progress");
  }
};

export const listenToUserProgress = (uid: string, callback: (progress: UserProgress | null) => void) => {
  const progressRef = doc(db, "userProgress", uid);

  const unsubscribe = onSnapshot(progressRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as UserProgress);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error("Error listening to user progress:", error);
    callback(null);
  });

  return unsubscribe;
};
