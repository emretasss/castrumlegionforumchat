"use client";

import { useState } from "react";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";

export default function Home() {
  const { status } = useSession();
  const [room, setRoom] = useState('general'); // Varsayılan oda adı

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <>
          <button
            className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
            onClick={() => {
              signOut();
            }}
          >
            Logout here
          </button>
          <Link
            href="/forum"
            className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
          >
            Go to Forum
          </Link>
        </>
      );
    } else if (status === "loading") {
      return (
        <span className="text-[#888] text-sm mt-7">Loading...</span>
      );
    } else {
      return (
        <>
          <Link
            href="/login"
            className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
          >
            Login here
          </Link>
          <Link
            href="/forum"
            className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
          >
            Go to Forum
          </Link>
        </>
      );
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl">NextAuth APP</h1>
      {showSession()}

      <ModeToggle />
    </main>
  );
}
