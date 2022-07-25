import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSigninCheck } from "reactfire";
import SignOutButton from './SignOutButton'

interface Props {
  loggedIn: boolean
}


const NavBar = () => {
 const {status, data: signInCheckResult } = useSigninCheck();
 if (status === 'loading') {
    return <span className="text-white">loading...</span>;
  }


  console.log(signInCheckResult.signedIn, signInCheckResult.user?.email)
 return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link href="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NEXTFLIX
        </h1>
      </Link>
      {signInCheckResult.signedIn ? (
        <div className="flex">
          <Link href="/Account">
            <button className="text-white pr-4">Account</button>
          </Link>
          <div>
            <SignOutButton />
          </div>
          {/* <Link href="/Signup">
        <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
          Sign Up
        </button>
      </Link> */}
        </div>
      ) : (
        <div>
          <Link href="/auth/SignIn">
            <button className="text-white pr-4">Sign In</button>
          </Link>
          <Link href="/auth/SignUp">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  )
};

export default NavBar;
