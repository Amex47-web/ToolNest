"use client";

import Link from "next/link";
import { Menu, LogOut, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function Navbar() {
    return (
        <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Logo className="h-8 w-8" showText={true} />
                </Link>

                {/* Center Navigation - Absolutely Positioned */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
                    <Link
                        href="/trending"
                        className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
                    >
                        Trending
                    </Link>

                    <Link
                        href="/tools"
                        className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
                    >
                        All Tools
                    </Link>

                    <div className="relative group pl-1">
                        <button className="flex items-center gap-1.5 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors focus:outline-none">
                            <span>Best Tools</span>
                            <svg className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl shadow-zinc-500/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-1.5 z-50 origin-top">
                            <DropdownLink href="/best-for/engineering">Engineering</DropdownLink>
                            <DropdownLink href="/best-for/marketing">Marketing</DropdownLink>
                            <DropdownLink href="/best-for/design">Design</DropdownLink>
                            <DropdownLink href="/best-for/productivity">Productivity</DropdownLink>
                            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />
                            <DropdownLink href="/best-for/startups">For Startups</DropdownLink>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    <AuthButtons />

                    <button className="md:hidden ml-2">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
}

function DropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="block px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
            {children}
        </Link>
    )
}

function AuthButtons() {
    const { user, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.href = "/";
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) return null;

    if (user) {
        return (
            <div className="relative pl-2 border-l border-zinc-200 dark:border-zinc-800" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                >
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-semibold text-sm border border-indigo-200 dark:border-indigo-800">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName || "User"} className="h-full w-full rounded-full object-cover" />
                        ) : (
                            (user.displayName || user.email || "U").charAt(0).toUpperCase()
                        )}
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl shadow-zinc-500/10 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                {user.displayName || "User"}
                            </p>
                            <p className="text-xs text-zinc-500 truncate">
                                {user.email}
                            </p>
                        </div>

                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left"
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="hidden md:flex items-center gap-3 pl-2 border-l border-zinc-200 dark:border-zinc-800">
            <Link
                href="/login"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
                Login
            </Link>
            <Link
                href="/signup"
                className="text-sm font-medium bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-2 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg shadow-zinc-500/10"
            >
                Get Started
            </Link>
        </div>
    );
}
