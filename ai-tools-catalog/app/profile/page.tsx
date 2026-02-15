"use client";

import { FadeIn } from "@/components/FadeIn";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }

        if (user) {
            setName(user.displayName || "");

            // Fetch additional user data from Firestore
            const fetchUserData = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.bio) setBio(data.bio);
                }
            };
            fetchUserData();
        }
    }, [user, loading, router]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSaving(true);
        setMessage("");

        try {
            // Update Auth Profile
            if (user.displayName !== name) {
                await updateProfile(user, { displayName: name });
            }

            // Update Firestore
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                name: name,
                bio: bio
            });

            setMessage("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <FadeIn>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">Your Profile</h1>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="h-20 w-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl border border-indigo-200 dark:border-indigo-800">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || "User"} className="h-full w-full rounded-full object-cover" />
                            ) : (
                                (name || user.email || "U").charAt(0).toUpperCase()
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{user.email}</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Member since {new Date(user.metadata.creationTime || Date.now()).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Display Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                rows={4}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Tell us about yourself..."
                                className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                            />
                        </div>

                        {message && (
                            <div className={`p-3 rounded-lg text-sm font-medium ${message.includes("success") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                                {message}
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </FadeIn>
        </div>
    );
}
