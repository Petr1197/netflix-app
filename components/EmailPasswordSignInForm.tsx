import Link from "next/link";
import { FormEvent, useCallback, useEffect } from "react";
import { useSignInWithEmailAndPassword } from '../core/hooks/useSignInWithEmailAndPAssword';

function EmailPasswordSignInForm(
  props: React.PropsWithChildren<{
    onSignin: () => void;
  }>
) {
  const [signIn, state] =
    useSignInWithEmailAndPassword();

  const loading = state.loading;
  const error = state.error;

  useEffect(() => {
    if (state.success) {
      props.onSignin();
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
      return signIn(email, password);
    },
    [loading, props, signIn]
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
        Sign In
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
            Dont have An Account? 
          </span>
          <Link href="/auth/SignUp">Sign Up</Link>
        </p>
    </form>
  );
}

export default EmailPasswordSignInForm;