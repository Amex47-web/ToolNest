import { getAllTools, getAllCategories } from "@/lib/getTools";
import { ToolBrowser } from "@/components/ToolBrowser";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ToolPricing } from "@/types";
import { Suspense } from "react";

// Need to export this manually since it's used in strict logical paths
const PRICING_TYPES = ["Free", "Freemium", "Paid"];

export const revalidate = 86400;

export async function generateStaticParams() {
    return PRICING_TYPES.map((type) => ({
        type: type.toLowerCase(),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
    const { type } = await params;
    return {
        title: `Best ${type.charAt(0).toUpperCase() + type.slice(1)} AI Tools`,
        description: `Find the best ${type} AI tools for your projects.`,
    };
}

export default async function PricingPage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;

    // Validate type
    const ValidTypes = PRICING_TYPES.map(t => t.toLowerCase());
    if (!ValidTypes.includes(type.toLowerCase())) {
        notFound();
    }

    const allTools = await getAllTools();
    const tools = allTools.filter(t => t.pricing?.toLowerCase() === type.toLowerCase());
    const allCategories = await getAllCategories();

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight capitalize">{type} AI Tools</h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Explore our collection of {type} AI tools.
                </p>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <ToolBrowser initialTools={tools} allCategories={allCategories} />
            </Suspense>
        </div>
    );
}
