// src/services/profile.ts
import { db } from "@/lib/firebase";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Achievement {
    id: string;
    title: string;
    issuer?: string;
    date: string;
    description?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
  title?: string;
  location?: string;
  company?: string;
  linkedin?: string;
  website?: string;
  experience?: Experience[];
  education?: Education[];
  achievements?: Achievement[];
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  } else {
    return null;
  }
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, data, { merge: true });
};


export const addExperience = async (uid: string, experience: Experience) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
        experience: arrayUnion(experience)
    }, { merge: true });
};

export const addEducation = async (uid: string, education: Education) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
        education: arrayUnion(education)
    }, { merge: true });
};

export const addAchievement = async (uid: string, achievement: Achievement) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
        achievements: arrayUnion(achievement)
    }, { merge: true });
}
