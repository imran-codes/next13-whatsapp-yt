import { auth, googleProvider } from "@/lib/firebase";
import { addUserToFirestore } from "@/lib/firebase/userController";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const handleSignIn = (router: AppRouterInstance) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const user = result?.user;
          addUserToFirestore(user);
          router.push("/");
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
