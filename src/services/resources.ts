
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, getDocs, doc, updateDoc } from "firebase/firestore";
import type { Resource } from "@/lib/data";

type NewResource = Omit<Resource, 'id' | 'createdAt'>;

export const addResource = async (resourceData: NewResource) => {
    try {
        const resourcesCollection = collection(db, "resources");
        await addDoc(resourcesCollection, {
            ...resourceData,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding resource: ", error);
        throw new Error("Could not add resource");
    }
}

export const updateResource = async (resourceId: string, resourceData: Partial<Resource>) => {
    try {
        const resourceDoc = doc(db, "resources", resourceId);
        await updateDoc(resourceDoc, resourceData);
    } catch (error) {
        console.error("Error updating resource: ", error);
        throw new Error("Could not update resource");
    }
};

export const listenToResources = (callback: (resources: Resource[]) => void) => {
  const resourcesCollection = collection(db, "resources");
  const q = query(resourcesCollection, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const resources = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Resource));
    callback(resources);
  });

  return unsubscribe;
};
