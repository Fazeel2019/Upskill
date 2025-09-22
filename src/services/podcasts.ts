
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import type { Podcast } from "@/lib/data";

type NewPodcast = Omit<Podcast, 'id' | 'createdAt'>;

export const addPodcast = async (podcastData: NewPodcast) => {
    try {
        const podcastsCollection = collection(db, "podcasts");
        await addDoc(podcastsCollection, {
            ...podcastData,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding podcast: ", error);
        throw new Error("Could not add podcast");
    }
}

export const updatePodcast = async (podcastId: string, podcastData: Partial<Podcast>) => {
    try {
        const podcastDoc = doc(db, "podcasts", podcastId);
        await updateDoc(podcastDoc, podcastData);
    } catch (error) {
        console.error("Error updating podcast: ", error);
        throw new Error("Could not update podcast");
    }
};

export const deletePodcast = async (podcastId: string) => {
    try {
        const podcastDoc = doc(db, "podcasts", podcastId);
        await deleteDoc(podcastDoc);
    } catch (error) {
        console.error("Error deleting podcast: ", error);
        throw new Error("Could not delete podcast");
    }
}

export const listenToPodcasts = (callback: (podcasts: Podcast[]) => void) => {
  const podcastsCollection = collection(db, "podcasts");
  const q = query(podcastsCollection, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const podcasts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Podcast));
    callback(podcasts);
  });

  return unsubscribe;
};
