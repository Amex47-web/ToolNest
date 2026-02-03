import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "secondary" | "outline" | "pricing";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    "bg-indigo-600 text-white hover:bg-indigo-700": variant === "default",
                    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700":
                        variant === "secondary",
                    "border border-zinc-200 text-zinc-950 dark:border-zinc-800 dark:text-zinc-50":
                        variant === "outline",
                    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300":
                        variant === "pricing", // Special variant for pricing
                },
                className
            )}
            {...props}
        />
    );
}
