import Link from "next/link";
import { FormEvent, useCallback, useEffect } from "react";
import { useSignUpWithEmailAndPassword } from "../core/hooks/UseSignupWithEmailPassword.tsx";

function EmailPasswordSignUpForm(
  props: React.PropsWithChildren<{
    onSignup: () => void;
  }>
) {
  const [signUp, state] =
    useSignUpWithEmailAndPassword();

  const loading = state.loading;
  const error = state.error;

  useEffect(() => {
    if (state.success) {
      props.onSignup();
    }
  }, [props, state.success]);

  const onSubmit = useCallback(
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      const data = new FormData(event.currentTarget);
      const email = data.get(`email`) as string;
      const password = data.get(`password`) as string;

      // sign user up
      return signUp(email, password);
    },
    [loading, props, signUp]
  );

  return (
    <form className={"w-full flex flex-col py-4"} onSubmit={onSubmit}>
      <input
        required
        placeholder="Your Email"
        name="email"
        type="email"
        className="p-3 my-2 bg-gray-700 rounded"
      />
      <input
        required
        placeholder="Your Password"
        name="password"
        type="password"
        className="p-3 my-2 bg-gray-700 rounded"
      />
      {
        error ? <span className="text-red-500">{error.message}</span> : null
      }
      <button
        disabled={loading}
        className="bg-red-600 py-3 my-6 rounded font-bold"
      >
        Sign Up
      </button>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <p>
          <input className="mr-2" type="checkbox" />
            Remember Me
        </p>
        <p>Need Help?</p>
      </div>
        <p className="py-8">
          <span className="text-gray-400 pr-2">
            Already Subscribed to Nextflix?
          </span>
          <Link href="/Login">Sign In</Link>
        </p>
    </form>
  );
}

export default EmailPasswordSignUpForm;