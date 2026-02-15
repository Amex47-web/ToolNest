"use client";

import { Tool } from "@/types";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight, Star } from "lucide-react";
import { ToolLogo } from "@/components/ToolLogo";
import { motion } from "framer-motion";
import { logUserActivity } from "@/lib/logger";

interface ToolCardProps {
    tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
    return (
        <Link
            href={`/tools/${tool.slug}`}
            className="block h-full"
            onClick={() => logUserActivity("click_tool_card", tool.slug, { toolName: tool.name })}
        >
            <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group h-full p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-colors relative overflow-hidden flex flex-col backdrop-blur-sm"
            >
                <div className="flex items-start justify-between mb-5">
                    <div className="h-14 w-14 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 flex items-center justify-center overflow-hidden border border-zinc-100 dark:border-zinc-700/50 shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                        <ToolLogo
                            src={tool.logo}
                            alt={tool.name}
                            fallbackText={tool.name}
                            website={tool.website}
                            className="h-9 w-9 object-contain"
                        />
                    </div>
                    <Badge variant={tool.pricing === "Free" ? "pricing" : "secondary"} className="shadow-none">
                        {tool.pricing}
                    </Badge>
                </div>

                <div className="mb-2">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        {tool.name}
                        <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                    {tool.rating && (
                        <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                {tool.rating}
                            </span>
                            <span className="text-xs text-zinc-400">
                                ({tool.reviewCount})
                            </span>
                        </div>
                    )}
                </div>

                <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                    {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {tool.categories.slice(0, 2).map((cat) => (
                        <Badge key={cat} variant="outline" className="bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                            {cat}
                        </Badge>
                    ))}
                    {tool.categories.length > 2 && (
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 self-center font-medium pl-1">
                            +{tool.categories.length - 2}
                        </span>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
