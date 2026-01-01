"use client";

import Link from "next/link";
import { FaKeyboard } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto text-gray-300">
            <Link href="/" className="flex items-center gap-2 group hover:text-white transition-colors">
                <FaKeyboard className="text-3xl text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                <h1 className="text-2xl font-bold tracking-tight">TypeMaster</h1>
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium">
                <Link href="/leaderboard" className="hover:text-white transition-colors">
                    Leaderboard
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                    About
                </Link>

                {session ? (
                    <div className="flex items-center gap-4">
                        <span className="text-yellow-500">{session.user?.name}</span>
                        <button
                            onClick={() => signOut()}
                            className="hover:text-white transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn("google")}
                        className="hover:text-white transition-colors"
                    >
                        Login
                    </button>
                )}
            </nav>
        </header>
    );
}
