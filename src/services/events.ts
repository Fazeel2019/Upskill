
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, getDocs, type Timestamp } from "firebase/firestore";
import type { Event } from "@/lib/data";

type NewEvent = Omit<Event, 'id'>;

export const addEvent = async (eventData: NewEvent) => {
    try {
        const eventsCollection = collection(db, "events");
        await addDoc(eventsCollection, {
            ...eventData,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding event: ", error);
        throw new Error("Could not add event");
    }
}

export const getEvents = async (): Promise<Event[]> => {
    const eventsCollection = collection(db, "events");
    const q = query(eventsCollection, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
}

export const listenToEvents = (callback: (events: Event[]) => void) => {
  const eventsCollection = collection(db, "events");
  const q = query(eventsCollection, orderBy("date", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const events = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            // Convert Firestore Timestamp to string if needed, or handle in component
            date: (data.date as Timestamp).toDate().toISOString(),
        } as Event;
    });
    callback(events);
  });

  return unsubscribe;
};
