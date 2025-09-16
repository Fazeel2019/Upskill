// src/services/profile.ts
import { db } from "@/lib/firebase";
import { arrayUnion, doc, getDoc, setDoc, writeBatch, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";

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
  connections?: Record<string, 'pending_sent' | 'pending_received' | 'connected'>;
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

export const sendFriendRequest = async (fromUid: string, toUid: string) => {
  const batch = writeBatch(db);
  const fromUserRef = doc(db, "users", fromUid);
  const toUserRef = doc(db, "users", toUid);

  batch.update(fromUserRef, { [`connections.${toUid}`]: "pending_sent" });
  batch.update(toUserRef, { [`connections.${fromUid}`]: "pending_received" });

  await batch.commit();
}

export const acceptFriendRequest = async (fromUid: string, toUid: string) => {
  const batch = writeBatch(db);
  const fromUserRef = doc(db, "users", fromUid);
  const toUserRef = doc(db, "users", toUid);

  batch.update(fromUserRef, { [`connections.${toUid}`]: "connected" });
  batch.update(toUserRef, { [`connections.${fromUid}`]: "connected" });

  await batch.commit();
}

export const declineFriendRequest = async (fromUid: string, toUid: string) => {
    const batch = writeBatch(db);
    const fromUserRef = doc(db, "users", fromUid);
    const toUserRef = doc(db, "users", toUid);

    batch.update(fromUserRef, { [`connections.${toUid}`]: null });
    batch.update(toUserRef, { [`connections.${fromUid}`]: null });
    
    await batch.commit();
}

export const listenToFriends = (uid: string, callback: (users: UserProfile[]) => void) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where(`connections.${uid}`, "==", "connected"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const friends = snapshot.docs.map(doc => doc.data() as UserProfile);
        callback(friends);
    });

    return unsubscribe;
}

export const listenToFriendRequests = (uid: string, callback: (users: UserProfile[]) => void) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where(`connections.${uid}`, "==", "pending_sent"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const requesters = snapshot.docs.map(doc => doc.data() as UserProfile);
        callback(requesters);
    });

    return unsubscribe;
}
