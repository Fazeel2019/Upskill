
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";

export interface UserProgress {
  lastResourceId: string;
  resourceId: string;
  resourceTitle: string;
  resourceYoutubeUrl: string;
  progress: number; // Percentage
  updatedAt: Timestamp;
}

export const updateUserProgress = async (uid: string, data: Partial<Omit<UserProgress, 'updatedAt' | 'lastResourceId'>> & { resourceId: string }) => {
  const progressRef = doc(db, "userProgress", uid);
  try {
    await setDoc(progressRef, {
      ...data,
      lastResourceId: data.resourceId, // Keep track of the last resource
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error updating user progress:", error);
    throw new Error("Could not update user progress");
  }
};

export const listenToLastProgress = (uid: string, callback: (progress: UserProgress | null) => void) => {
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
