'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { LoadingSpinner } from '@/components/common/loading-spinner';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once

  if (!firebaseServices.firebaseApp) {
    if (process.env.NODE_ENV !== 'production') {
      return (
        <div style={{
          position: 'fixed',
          inset: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          zIndex: 9999,
          padding: '2rem',
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            padding: '2rem',
            backgroundColor: '#1a1a1a',
            border: '1px solid #444',
            borderRadius: '8px',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
              <h2 style={{ color: '#ffc107', marginBottom: '1rem' }}>Firebase Not Configured</h2>
              <p style={{ color: '#d9d9d9', lineHeight: '1.5' }}>
                  This application requires a Firebase backend. Please set up your <code style={{ backgroundColor: '#333', padding: '0.2em 0.4em', borderRadius: '3px', color: '#ffc107' }}>.env.local</code> file with your Firebase project credentials.
              </p>
              <p style={{ color: '#a0a0a0', marginTop: '1rem', fontSize: '0.9em' }}>
                  Follow the instructions in the <code style={{ backgroundColor: '#333', padding: '0.2em 0.4em', borderRadius: '3px', color: '#ffc107' }}>README.md</code> file to get started.
              </p>
          </div>
        </div>
      );
    }
    // In production, you might want a less obtrusive fallback or just a loading spinner.
    return <LoadingSpinner fullScreen />;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth!}
      firestore={firebaseServices.firestore!}
    >
      {children}
    </FirebaseProvider>
  );
}
