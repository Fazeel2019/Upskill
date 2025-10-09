
"use client"

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, Timestamp, updateDoc, writeBatch } from "firebase/firestore";
import type { Course } from "@/lib/data";
import { addNotification } from "./notifications";

export interface CourseProgress {
    course: Course;
    progress: number; // Percentage
    completedLectures: string[];
    lastLectureId?: string;
}

export interface UserProgress {
  lastCourseId?: string;
  courses?: { [courseId: string]: CourseProgress };
  updatedAt: Timestamp;
}

export const enrollInCourse = async (uid: string, course: Course) => {
    const progressRef = doc(db, "userProgress", uid);
    
    const newCourseData: CourseProgress = {
        course: course, // The course object itself
        progress: 0,
        completedLectures: [],
    };

    try {
        await setDoc(progressRef, {
            courses: {
                [course.id]: newCourseData
            },
            lastCourseId: course.id,
            updatedAt: serverTimestamp(),
        }, { merge: true });
        
        await addNotification(uid, {
            type: "course_progress",
            message: `You've enrolled in "${course.title}"! Start learning now.`,
            link: `/learning/course/${course.id}`,
        })

    } catch (error) {
        console.error("Error enrolling in course:", error);
        throw new Error("Could not enroll in course.");
    }
};

export const updateUserProgress = async (uid: string, courseId: string, progress: number, completedLectures: string[], lastLectureId: string) => {
  const progressRef = doc(db, "userProgress", uid);
  try {
    const batch = writeBatch(db);

    batch.update(progressRef, {
      [`courses.${courseId}.progress`]: progress,
      [`courses.${courseId}.completedLectures`]: completedLectures,
      [`courses.${courseId}.lastLectureId`]: lastLectureId,
      lastCourseId: courseId,
      updatedAt: serverTimestamp(),
    });

    await batch.commit();

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
