"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
                aria-label="ToolNest Logo"
            >
                {/* Lines - Dark connections */}
                {/* Connecting the outer diamond shape */}
                <path d="M50 15 L15 50" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" className="dark:stroke-white/80" />
                <path d="M50 15 L85 50" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" className="dark:stroke-white/80" />
                <path d="M15 50 L50 85" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" className="dark:stroke-white/80" />
                <path d="M85 50 L50 85" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" className="dark:stroke-white/80" />

                {/* Connections to inner nodes */}
                {/* Top to Inner Left & Inner Right */}
                <path d="M50 15 L38 45" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" className="dark:stroke-white/80" /> {/* Thicker main strut */}
                <path d="M50 15 L62 55" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" className="dark:stroke-white/80" />

                {/* Bottom to Inner Left & Inner Right */}
                <path d="M50 85 L38 45" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" className="dark:stroke-white/80" />
                <path d="M50 85 L62 55" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" className="dark:stroke-white/80" /> {/* Thicker main strut */}

                {/* Side to Inner */}
                <path d="M15 50 L38 45" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" className="dark:stroke-white/80" />
                <path d="M85 50 L62 55" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" className="dark:stroke-white/80" />

                {/* Inner to Inner */}
                <path d="M38 45 L62 55" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" className="dark:stroke-white/80" />


                {/* Nodes */}
                {/* Top Ring */}
                <circle cx="50" cy="15" r="9" stroke="#2563EB" strokeWidth="6" fill="white" className="dark:fill-zinc-950" />

                {/* Bottom Ring */}
                <circle cx="50" cy="85" r="9" stroke="#2563EB" strokeWidth="6" fill="white" className="dark:fill-zinc-950" />

                {/* Left Ring */}
                <circle cx="15" cy="50" r="9" stroke="#2563EB" strokeWidth="6" fill="white" className="dark:fill-zinc-950" />

                {/* Right Ring */}
                <circle cx="85" cy="50" r="9" stroke="#2563EB" strokeWidth="6" fill="white" className="dark:fill-zinc-950" />

                {/* Inner Nodes - Solid */}
                <circle cx="38" cy="45" r="8" fill="#2563EB" />
                <circle cx="62" cy="55" r="8" fill="#2563EB" />

            </svg>

            {showText && (
                <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50">
                    ToolNest
                </span>
            )}
        </div>
    );
}
