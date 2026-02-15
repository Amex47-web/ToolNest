"use client";

import { Launch } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Rocket, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface LaunchesTimelineProps {
    launches: Launch[];
}

export function LaunchesTimeline({ launches }: LaunchesTimelineProps) {
    if (!launches || launches.length === 0) return null;

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <Rocket className="h-6 w-6 text-orange-500" />
                Launch History
            </h2>

            <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 space-y-8 py-2">
                {launches.map((launch, i) => (
                    <div key={i} className="relative pl-8">
                        {/* Timeline Dot */}
                        <div
                            className={cn(
                                "absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-zinc-950",
                                launch.isMajor ? "bg-orange-500" : "bg-zinc-300 dark:bg-zinc-700"
                            )}
                        />

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                                {launch.version}
                                {launch.isMajor && (
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs border-orange-200 dark:border-orange-800">
                                        Major Release
                                    </Badge>
                                )}
                            </h3>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(launch.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>

                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 mt-2">
                            {launch.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
