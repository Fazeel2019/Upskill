
import { db } from "@/lib/firebase";
import { 
    collection, 
    addDoc, 
    serverTimestamp, 
    query, 
    orderBy, 
    onSnapshot, 
    type Timestamp,
    where,
    doc,
    updateDoc,
    limit
} from "firebase/firestore";

export interface Notification {
  id: string;
  uid: string; // The user who receives the notification
  type: 'friend_request' | 'course_progress' | 'new_message' | 'event_reminder';
  message: string;
  link?: string;
  read: boolean;
  timestamp: Timestamp;
};

export type NewNotification = Omit<Notification, 'id' | 'uid' | 'timestamp' | 'read'>;

export const addNotification = async (uid: string, notificationData: NewNotification) => {
    try {
        const notificationsCollection = collection(db, "notifications");
        await addDoc(notificationsCollection, {
            ...notificationData,
            uid: uid,
            read: false,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding notification: ", error);
        throw new Error("Could not add notification");
    }
};

export const markNotificationAsRead = async (notificationId: string) => {
    try {
        const notificationDoc = doc(db, "notifications", notificationId);
        await updateDoc(notificationDoc, { read: true });
    } catch (error) {
        console.error("Error marking notification as read: ", error);
        throw new Error("Could not update notification");
    }
};

export const listenToNotifications = (uid: string, callback: (notifications: Notification[]) => void) => {
    const notificationsCollection = collection(db, "notifications");
    // Removed the compound query to avoid the index requirement.
    // We will now fetch the latest notifications and filter them on the client.
    const q = query(notificationsCollection, orderBy("timestamp", "desc"), limit(50));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const allNotifications = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Notification));
        
        // Filter for the current user on the client-side
        const userNotifications = allNotifications.filter(n => n.uid === uid);
        
        callback(userNotifications);
    }, (error) => {
        // This should no longer throw an index error.
        console.error("Error listening to notifications: ", error);
    });
    
    return unsubscribe;
}
