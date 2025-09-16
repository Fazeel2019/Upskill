import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, type Timestamp, doc, setDoc } from "firebase/firestore";

export interface Message {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    timestamp: Timestamp;
}

// Creates a unique, consistent chat ID for any two users
export const getChatId = (uid1: string, uid2: string): string => {
    return [uid1, uid2].sort().join('_');
};

export const sendMessage = async (chatId: string, senderId: string, text: string) => {
    const chatRef = doc(db, 'chats', chatId);
    const messagesColRef = collection(chatRef, 'messages');

    // Set the last message on the chat document for previews/sorting
    await setDoc(chatRef, { 
        lastMessage: text,
        lastMessageTimestamp: serverTimestamp(),
        participants: chatId.split('_') 
    }, { merge: true });

    await addDoc(messagesColRef, {
        senderId,
        text,
        timestamp: serverTimestamp()
    });
};

export const listenToMessages = (chatId: string, callback: (messages: Message[]) => void) => {
    const messagesColRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesColRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Message));
        callback(messages);
    }, (error) => {
        console.error("Error listening to messages:", error);
    });

    return unsubscribe;
};
