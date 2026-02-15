import { getAllCategories, getAllTools } from "@/lib/getTools";
import { ToolBrowser } from "@/components/ToolBrowser";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "All AI Tools",
    description: "Browse our complete directory of AI tools tailored for every use case.",
};

export default async function ToolsPage() {
    const tools = await getAllTools();
    const categories = await getAllCategories();

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-indigo-800 to-zinc-900 dark:from-white dark:via-indigo-200 dark:to-white pb-2">
                    Browse AI Tools
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Discover the best AI tools to supercharge your workflow. <br className="hidden md:block" />
                    Filter by category, pricing, and capabilities to find exactly what you need.
                </p>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <ToolBrowser initialTools={tools} allCategories={categories} />
            </Suspense>
        </div>
    );
}
