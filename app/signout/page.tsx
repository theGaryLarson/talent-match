"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    signOut({ redirectTo: "/" });
  }, []);
  return <></>;
}
