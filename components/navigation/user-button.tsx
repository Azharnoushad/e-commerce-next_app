"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type UserButtonProps = {
  user?: Session["user"];
  expires?: string;
};

export default function UserButton({ user, expires }: UserButtonProps) {
  return (
    <div>
      <h2>{user?.email}</h2>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
