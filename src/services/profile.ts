
// src/services/profile.ts
import { db } from "@/lib/firebase";
import { arrayUnion, doc, getDoc, setDoc, writeBatch, collection, query, where, getDocs, onSnapshot, orderBy, limit, startAt, endAt, deleteField, Timestamp } from "firebase/firestore";

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
  role?: 'admin';
  membership?: 'winner-circle';
  membershipExpiresAt?: Timestamp;
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
  const updateData = { ...data };

  // Firestore's `set` with `merge: true` won't remove fields if the value is `undefined`.
  // We need to explicitly use `deleteField()` for fields that should be removed.
  if (data.role === undefined || data.role === null) {
    updateData.role = deleteField() as any;
  }
  
  if (data.membership === undefined || data.membership === null) {
    updateData.membership = deleteField() as any;
  }


  await setDoc(userRef, updateData, { merge: true });
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

    // Use deleteField to properly remove the connection status
    batch.update(fromUserRef, { [`connections.${toUid}`]: deleteField() });
    batch.update(toUserRef, { [`connections.${fromUid}`]: deleteField() });
    
    await batch.commit();
}

export const removeFriend = async (uid1: string, uid2: string) => {
  const batch = writeBatch(db);
  const user1Ref = doc(db, "users", uid1);
  const user2Ref = doc(db, "users", uid2);

  batch.update(user1Ref, { [`connections.${uid2}`]: deleteField() });
  batch.update(user2Ref, { [`connections.${uid1}`]: deleteField() });

  await batch.commit();
};

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

export const searchUsers = async (searchQuery: string, currentUserId: string): Promise<UserProfile[]> => {
    const usersRef = collection(db, "users");

    if (!searchQuery) {
        const q = query(usersRef, orderBy("displayName"), limit(20));
        const querySnapshot = await getDocs(q);
        const users: UserProfile[] = [];
        querySnapshot.forEach((doc) => {
            if (doc.id !== currentUserId) {
                users.push(doc.data() as UserProfile);
            }
        });
        return users;
    }

    const nameQuery = query(
        usersRef,
        orderBy("displayName"),
        startAt(searchQuery),
        endAt(searchQuery + '\uf8ff')
    );

    const emailQuery = query(
        usersRef,
        orderBy("email"),
        startAt(searchQuery),
        endAt(searchQuery + '\uf8ff')
    );

    const [nameSnapshot, emailSnapshot] = await Promise.all([
        getDocs(nameQuery),
        getDocs(emailQuery)
    ]);

    const usersMap = new Map<string, UserProfile>();

    const processSnapshot = (snapshot: any) => {
        snapshot.forEach((doc: any) => {
            if (doc.id !== currentUserId && !usersMap.has(doc.id)) {
                usersMap.set(doc.id, doc.data() as UserProfile);
            }
        });
    };

    processSnapshot(nameSnapshot);
    processSnapshot(emailSnapshot);

    return Array.from(usersMap.values());
};
