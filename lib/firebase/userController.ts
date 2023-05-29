import { User } from "firebase/auth";
import { firestoreApp } from ".";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  collection,
  DocumentData,
  getDoc,
} from "firebase/firestore";

export const firestore = getFirestore(firestoreApp);

export const usersCollection = collection(firestore, "users");

export const addUserToFirestore = async (user: User) => {
  // if user already exists in firestore , update the last seen to now
  // if user does not exist in firestore, add user to firestore
  const userRef = doc(firestore, "users", user.uid);
  await setDoc(
    userRef,
    {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      lastOnline: serverTimestamp(),
    },
    { merge: true }
  );
};

export function getSnapshotDoc(doc: DocumentData) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}

export const getSingleUserFromFirestore = async (userId: string) => {
  if (!userId) return;
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  const user = userSnap.data();
  return user;
};
