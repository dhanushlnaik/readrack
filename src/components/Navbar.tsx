"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full border-b-4 border-black bg-yellow-100 py-4 px-6 shadow-md relative z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto relative">
        {/* Left Nav */}
        <div className="flex gap-4 text-sm font-mono">
          <Link href="/books" className="hover:underline hover:text-purple-700">Books</Link>
          <Link href="/about" className="hover:underline hover:text-purple-700">About</Link>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="text-2xl font-extrabold text-purple-900 relative inline-block">
            Read<span className="text-pink-600">.</span>Rack
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-12 h-[3px] bg-black rounded-full" />
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex gap-4 text-sm font-mono">
          {!session ? (
            <Link href="/auth/login" className="hover:underline hover:text-purple-700">Login</Link>
          ) : (
            session.user ? (
              <Link href={`/profile/${session.user.id}`} className="hover:underline hover:text-purple-700">Profile</Link>
            ) : null
          )}
        </div>
      </div>
    </nav>
  );
}
