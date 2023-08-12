import React from "react";
import {signIn, signOut, useSession} from "next-auth/react";

const Login = () => {
  const {data: sessionData} = useSession();

  return (
    <div className="">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export {Login};