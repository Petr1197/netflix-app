import { initializeApp } from 'firebase/app';
import {
    initializeAuth,
    indexedDBLocalPersistence,
    connectAuthEmulator,
    inMemoryPersistence,
  } from 'firebase/auth';
  import { getFirestore } from 'firebase/firestore';
  import configuration from './configuration';


export const app = initializeApp(configuration.firebase);

  // make sure we're not using IndexedDB when SSR
  // as it is only supported on browser environments
export const persistence = indexedDBLocalPersistence;
  //   ? 
  //   : inMemoryPersistence;

export const auth = initializeAuth(app, { persistence });
  // prevent emulator from being
  // called multiple times on page navigations

export const db = getFirestore(app);