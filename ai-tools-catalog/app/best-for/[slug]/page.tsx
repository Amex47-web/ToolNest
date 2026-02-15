import { COLLECTIONS, getCollectionBySlug, getToolsInCollection } from "@/lib/collections";
import { ToolBrowser } from "@/components/ToolBrowser";
import { getAllCategories } from "@/lib/getTools";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 86400; // ISR 24 hours

export async function generateStaticParams() {
    return COLLECTIONS.map((collection) => ({
        slug: collection.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const collection = getCollectionBySlug(slug);

    if (!collection) return {};

    return {
        title: `${collection.title} - Top AI Tools`,
        description: collection.description,
    };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const collection = getCollectionBySlug(slug);

    if (!collection) {
        notFound();
    }

    const tools = await getToolsInCollection(collection);
    const allCategories = await getAllCategories();

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-indigo-800 to-zinc-900 dark:from-white dark:via-indigo-200 dark:to-white pb-2">
                    {collection.title}
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    {collection.description}
                </p>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <ToolBrowser initialTools={tools} allCategories={allCategories} />
            </Suspense>
        </div>
    );
}
