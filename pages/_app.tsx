import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  indexedDBLocalPersistence,
  connectAuthEmulator,
  inMemoryPersistence,
} from 'firebase/auth';
import { useAuth, useSigninCheck } from "reactfire";

import {
  FirebaseAppProvider,
  AuthProvider
} from 'reactfire';

import configuration from '../configuration';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import { stat } from 'fs';
// import { isBrowser } from "../lib/generic/isBrowser";


export default function App({ Component, pageProps }: AppProps) { 

 
  const [loggedIn, setloggedIn] = useState(false);
  
  useEffect(() => {
    if(status === "success") {
      setloggedIn(true);
    }else{
      
    }
  
    return;
  }, [])
  
  // we initialize the firebase app
  // using the configuration that we defined above
  const app = initializeApp(configuration.firebase);

  // make sure we're not using IndexedDB when SSR
  // as it is only supported on browser environments
  const persistence = indexedDBLocalPersistence;
  //   ? 
  //   : inMemoryPersistence;

  const auth = initializeAuth(app, { persistence });
  // prevent emulator from being
  // called multiple times on page navigations
  

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <NavBar />
        <Component {...pageProps} />
      </AuthProvider>
    </FirebaseAppProvider>
  );
}

