import {
  type Auth,
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  getAdditionalUserInfo,
} from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { createUserProfile } from './firestore';

export const signUpWithEmail = (auth: Auth, db: Firestore, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (userCredential.user) {
        createUserProfile(db, userCredential.user);
      }
      return userCredential;
    });
};

export const signInWithEmail = (auth: Auth, email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = (auth: Auth, db: Firestore) => {
  return signInWithPopup(auth, googleProvider).then((result) => {
    const additionalInfo = getAdditionalUserInfo(result);
    if (additionalInfo?.isNewUser && result.user) {
        createUserProfile(db, result.user);
    }
    return result;
  });
};

export const signOut = (auth: Auth) => {
  return firebaseSignOut(auth);
};
