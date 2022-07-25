import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { useAuth } from "reactfire";

const SignOutButton = () => {
  const auth = useAuth();

  const onSignOutRequested = useCallback(() => {
    return signOut(auth);

  }, [auth]);

  return (
    <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white" onClick={onSignOutRequested}>
      Sign Out
    </button>
  );
};

export default SignOutButton;