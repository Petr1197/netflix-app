import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import EmailPasswordSignUpForm from "../../components/EmailPasswordSignUpForm";
import { GoogleAuthProvider } from "firebase/auth";

import { useSignInWithProvider } from "../../core/hooks/useSignInWithProvider";

const SignUp = () => {
    const router = useRouter();
    const [signInWithProvider, signInWithProviderState] = useSignInWithProvider();

    const AuthProviderButton = () => {
        return (
          <button
            className="rounded-lg p-2 font-bold bg-red-400 text-white"
            onClick={() => {
              signInWithProvider(new GoogleAuthProvider());
            }}
          >
            Login with Google
          </button>
        );
      };

  const onSignup = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  useEffect(() => {
    if (signInWithProviderState.success) {
      onSignup();
    }
  }, [signInWithProviderState.success, onSignup]);

  return (
    <div className="AuthContainer">
      <h1 className="Hero">Sign Up</h1>

      <div className="flex flex-col space-y-8">
        <AuthProviderButton />
        <br />

        <EmailPasswordSignUpForm onSignup={onSignup} />
      </div>
    </div>
  )
}

export default SignUp