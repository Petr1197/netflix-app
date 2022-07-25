import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleAuthProvider } from "firebase/auth";

import EmailPasswordSignInForm from "../../components/EmailPasswordSignInForm";

const SignIn = () => {
  const router = useRouter();

  

  const onSignIn = useCallback( () => {
    return router.push("/");
  }, [router]);

  

  return (
    <div className="w-full h-screen ">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="http://authors.appadvice.com/wp-content/appadvice-v2-media/2016/11/Netflix-background_860c8ece6b34fb4f43af02255ca8f225.jpg"
          alt="/"
        />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <EmailPasswordSignInForm onSignin={onSignIn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;