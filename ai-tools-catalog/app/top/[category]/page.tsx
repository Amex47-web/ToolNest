import { getAllCategories, getAllTools } from "@/lib/getTools";
import { ToolCard } from "@/components/ToolCard";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
        title: `Top 10 AI Tools for ${categoryName}`,
        description: `Hand-picked selection of the best AI tools for ${categoryName}.`,
    };
}

export default async function TopCategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const categoryName = decodeURIComponent(category);
    const allInitialTools = await getAllTools();

    // Logic for "Top": Filter by category then maybe sort by "featured" or just take the first X
    const tools = allInitialTools
        .filter(t => t.categories?.some(c => c.toLowerCase() === categoryName.toLowerCase()))
        .slice(0, 10); // Take top 10

    if (tools.length === 0) {
        // Optional: 404 if empty
    }

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight capitalize">Top 10 AI Tools for {decodeURIComponent(category)}</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                    The highest-rated and most popular AI tools for {decodeURIComponent(category)}.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
        </div>
    );
}
