"use client";

import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { ArrowRight, Github } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user's last login
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                lastLogin: new Date().toISOString()
            }).catch(async (error) => {
                // If document does not exist, create it (legacy users)
                if (error.code === 'not-found') {
                    await setDoc(userRef, {
                        uid: user.uid,
                        email: user.email,
                        createdAt: new Date().toISOString(),
                        lastLogin: new Date().toISOString()
                    });
                }
            });
            router.push("/");
        } catch (error: unknown) {
            const err = error as { code?: string; message?: string };
            console.error(err);
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <FadeIn className="w-full max-w-md">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                    {/* Decorative sheen */}
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center justify-center mb-6">
                            <Logo showText={true} />
                        </Link>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Welcome back</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-2">Sign in to your account</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Password
                                </label>
                                <Link href="#" className="text-xs text-indigo-600 hover:text-indigo-500 font-medium">Forgot password?</Link>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight className="h-4 w-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-zinc-900 text-zinc-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                <Github className="h-4 w-4" />
                                <span className="text-sm font-medium">GitHub</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                <span className="text-sm font-medium">Google</span>
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-zinc-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </FadeIn>
        </div>
    );
}
