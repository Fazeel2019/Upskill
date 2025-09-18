
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
    updateDoc
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
    const q = query(notificationsCollection, where("uid", "==", uid), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notifications = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Notification));
        callback(notifications);
    }, (error) => {
        console.error("Error listening to notifications: ", error);
    });
    
    return unsubscribe;
}
