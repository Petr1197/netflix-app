import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {FirebaseAppProvider, AuthProvider} from 'reactfire';
import {app,auth} from '../authContext'
import NavBar from '../components/NavBar';


export default function App({ Component, pageProps }: AppProps) { 

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <NavBar />
        <Component {...pageProps} />
      </AuthProvider>
    </FirebaseAppProvider>
  );
}

