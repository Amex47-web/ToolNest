import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
            <h1 className="text-9xl font-black text-indigo-100 dark:text-indigo-900">404</h1>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Page Not Found</h2>
                <p className="text-zinc-500">
                    Sorry, we couldn&apos;t find the tool or page you&apos;re looking for.
                </p>
            </div>
            <Link
                href="/"
                className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
}
