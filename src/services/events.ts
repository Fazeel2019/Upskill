
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, getDocs, type Timestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
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

export const updateEvent = async (eventId: string, eventData: Partial<Event>) => {
    try {
        const eventDoc = doc(db, "events", eventId);
        await updateDoc(eventDoc, eventData);
    } catch (error) {
        console.error("Error updating event: ", error);
        throw new Error("Could not update event");
    }
};

export const deleteEvent = async (eventId: string) => {
    try {
        const eventDoc = doc(db, "events", eventId);
        await deleteDoc(eventDoc);
    } catch (error) {
        console.error("Error deleting event: ", error);
        throw new Error("Could not delete event");
    }
};

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
        let eventDate: string;

        if (data.date && typeof data.date.toDate === 'function') {
            // It's a Firestore Timestamp
            eventDate = (data.date as Timestamp).toDate().toISOString().split('T')[0];
        } else {
            // It's already a string or some other format
            eventDate = data.date;
        }

        return {
            id: doc.id,
            ...data,
            date: eventDate,
        } as Event;
    });
    callback(events);
  });

  return unsubscribe;
};
