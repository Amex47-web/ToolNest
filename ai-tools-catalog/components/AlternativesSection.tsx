"use client";

import { Tool } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { ToolLogo } from "@/components/ToolLogo";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";

interface AlternativesSectionProps {
    currentToolName: string;
    alternatives: Tool[];
}

export function AlternativesSection({ currentToolName, alternatives }: AlternativesSectionProps) {
    if (alternatives.length === 0) return null;

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                    <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 p-1.5 rounded-lg">
                        <Star className="h-5 w-5 fill-indigo-600 text-indigo-600" />
                    </span>
                    Top Alternatives to {currentToolName}
                </h2>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {alternatives.map((tool) => (
                        <div key={tool.id} className="group p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="shrink-0">
                                    <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                                        <ToolLogo
                                            src={tool.logo}
                                            alt={tool.name}
                                            fallbackText={tool.name}
                                            website={tool.website}
                                            className="h-8 w-8 object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="flex-grow min-w-0">
                                    <div className="flex items-center justify-between gap-4 mb-1">
                                        <Link href={`/tools/${tool.slug}`} className="font-bold text-lg text-zinc-900 dark:text-zinc-50 hover:text-indigo-600 transition-colors truncate">
                                            {tool.name}
                                        </Link>
                                        <div className="hidden sm:flex items-center gap-2">
                                            <Badge variant={tool.pricing === "Free" ? "pricing" : "secondary"} className="text-xs">
                                                {tool.pricing}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs text-zinc-500">
                                                {tool.categories[0]}
                                            </Badge>
                                        </div>
                                    </div>

                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 pr-4 mb-3">
                                        {tool.description}
                                    </p>

                                    <div className="flex items-center gap-4 sm:hidden mb-3">
                                        <Badge variant={tool.pricing === "Free" ? "pricing" : "secondary"} className="text-xs">
                                            {tool.pricing}
                                        </Badge>
                                    </div>

                                    <Link
                                        href={`/tools/${tool.slug}`}
                                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        Compare with {currentToolName} <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 text-center border-t border-zinc-100 dark:border-zinc-800">
                    <Link href="/tools" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                        View all AI tools
                    </Link>
                </div>
            </div>
        </section>
    );
}
