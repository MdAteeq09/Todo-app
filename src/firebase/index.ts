'use client';

import { firebaseConfig, isFirebaseConfigValid } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase(): {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
} {
  if (getApps().length) {
    return getSdks(getApp());
  }

  // In a Firebase App Hosting environment, the SDK is automatically initialized.
  // The try/catch block handles this case.
  try {
    const app = initializeApp();
    return getSdks(app);
  } catch (e) {
    // This likely means we are in a local development environment.
    // We'll check if the local config is valid.
  }

  if (isFirebaseConfigValid()) {
    const app = initializeApp(firebaseConfig);
    return getSdks(app);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(
      'Firebase config is not valid. Please set up your .env.local file with the correct Firebase credentials.'
    );
  }

  return {
    firebaseApp: null,
    auth: null,
    firestore: null,
  };
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
