

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, getDocs, type Timestamp, doc, updateDoc, deleteDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import type { Event } from "@/lib/data";

type NewEvent = Omit<Event, 'id'>;

export const addEvent = async (eventData: NewEvent) => {
    try {
        const eventsCollection = collection(db, "events");
        await addDoc(eventsCollection, {
            ...eventData,
            createdAt: serverTimestamp(),
            registeredUids: [],
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

export const getEvent = async (eventId: string): Promise<Event | null> => {
    try {
        const eventDoc = doc(db, "events", eventId);
        const docSnap = await getDoc(eventDoc);
        if (docSnap.exists()) {
            const data = docSnap.data();
            let eventDate: string;

            if (data.date && typeof data.date.toDate === 'function') {
                eventDate = (data.date as Timestamp).toDate().toISOString().split('T')[0];
            } else {
                eventDate = data.date;
            }
             return { id: docSnap.id, ...data, date: eventDate } as Event;
        }
        return null;
    } catch (error) {
        console.error("Error getting event:", error);
        throw new Error("Could not retrieve event");
    }
}

export const registerForEvent = async (eventId: string, userId: string): Promise<void> => {
    try {
        const eventDoc = doc(db, "events", eventId);
        await updateDoc(eventDoc, {
            registeredUids: arrayUnion(userId)
        });
    } catch (error) {
        console.error("Error registering for event:", error);
        throw new Error("Could not register for event");
    }
};

export const unregisterFromEvent = async (eventId: string, userId: string): Promise<void> => {
    try {
        const eventDoc = doc(db, "events", eventId);
        await updateDoc(eventDoc, {
            registeredUids: arrayRemove(userId)
        });
    } catch (error) {
        console.error("Error unregistering from event:", error);
        throw new Error("Could not unregister from event");
    }
};

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
