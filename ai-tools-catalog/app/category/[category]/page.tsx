import { getAllCategories, getAllTools, getToolsByCategory } from "@/lib/getTools";
import { ToolBrowser } from "@/components/ToolBrowser";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const revalidate = 86400;

export async function generateStaticParams() {
    const categories = await getAllCategories();
    return categories.map((category) => ({
        category: category.toLowerCase(),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params;
    const categoryName = decodeURIComponent(category);
    return {
        title: `Best AI ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Tools`,
        description: `Explore the top AI tools for ${categoryName}.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const categoryName = decodeURIComponent(category);
    // Case insensitive check since params are lowercase
    const allInitialTools = await getAllTools();
    const tools = allInitialTools.filter(t => t.categories?.some(c => c.toLowerCase() === categoryName.toLowerCase()));

    if (tools.length === 0) {
        const categories = await getAllCategories();
        const allCats = categories.map(c => c.toLowerCase());
        if (!allCats.includes(categoryName.toLowerCase())) {
            notFound();
        }
    }

    const allCategories = await getAllCategories();

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight capitalize">{decodeURIComponent(category)} AI Tools</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Curated list of the best AI tools for {decodeURIComponent(category)}.
                </p>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <ToolBrowser initialTools={tools} allCategories={allCategories} />
            </Suspense>
        </div>
    );
}
