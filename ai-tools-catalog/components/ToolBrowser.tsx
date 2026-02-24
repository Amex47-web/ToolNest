"use client";

import { Tool } from "@/types";
import { ToolCard } from "@/components/ToolCard";
import { useState, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FadeInStagger, FadeInItem } from "@/components/FadeIn";

interface ToolBrowserProps {
    initialTools: Tool[];
    allCategories: string[];
}

export function ToolBrowser({ initialTools, allCategories }: ToolBrowserProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
    const [selectedPricing, setSelectedPricing] = useState(searchParams.get("pricing") || "");

    // Update URL on filter change
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery) params.set("q", searchQuery);
        if (selectedCategory) params.set("category", selectedCategory);
        if (selectedPricing) params.set("pricing", selectedPricing);

        // Only push if params change, replace to avoid history stack spam
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [searchQuery, selectedCategory, selectedPricing, router, pathname]);

    // Filter tools logic
    const filteredTools = useMemo(() => {
        let result = initialTools;

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (tool) =>
                    tool.name.toLowerCase().includes(q) ||
                    tool.description.toLowerCase().includes(q)
            );
        }

        if (selectedCategory) {
            result = result.filter((tool) =>
                tool.categories.some((c) => c.toLowerCase() === selectedCategory.toLowerCase())
            );
        }

        if (selectedPricing) {
            result = result.filter((tool) => tool.pricing.toLowerCase() === selectedPricing.toLowerCase());
        }

        return result;
    }, [initialTools, searchQuery, selectedCategory, selectedPricing]);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSelectedPricing("");
    };

    return (
        <div className="space-y-10">
            {/* Search and Filters Bar */}
            <div className="sticky top-20 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-grow">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-zinc-400">
                            <Search className="h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search AI tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 h-12 bg-transparent border-none rounded-xl focus:ring-0 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 outline-none transition-all text-base"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-full"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block my-auto" />

                    <div className="flex gap-2 p-1">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="h-10 px-4 bg-zinc-50 dark:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer transition-all"
                        >
                            <option value="">All Categories</option>
                            {allCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedPricing}
                            onChange={(e) => setSelectedPricing(e.target.value)}
                            className="h-10 px-4 bg-zinc-50 dark:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer transition-all"
                        >
                            <option value="">Any Pricing</option>
                            <option value="Free">Free</option>
                            <option value="Freemium">Freemium</option>
                            <option value="Paid">Paid</option>
                        </select>

                        {(searchQuery || selectedCategory || selectedPricing) && (
                            <button
                                onClick={clearFilters}
                                className="h-10 px-4 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors font-medium whitespace-nowrap"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Count & Grid */}
            <div className="min-h-[400px]">
                <div className="flex items-center justify-between mb-6 px-2">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Showing <span className="text-zinc-900 dark:text-zinc-100">{filteredTools.length}</span> tools
                    </p>

                    {/* Suggest Tool Button (Placeholder) */}
                    <button className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                        Suggest a tool
                    </button>
                </div>

                {filteredTools.length > 0 ? (
                    <FadeInStagger key={`${selectedCategory}-${selectedPricing}-${searchQuery}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTools.map((tool) => (
                            <FadeInItem key={tool.id} className="h-full">
                                <ToolCard tool={tool} />
                            </FadeInItem>
                        ))}
                    </FadeInStagger>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
                        <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-zinc-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">No tools found</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-sm mb-6">
                            We couldn&apos;t find any tools matching your search criteria. Try using broader terms or clearing your filters.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
