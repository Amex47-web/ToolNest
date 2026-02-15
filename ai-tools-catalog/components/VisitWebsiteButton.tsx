"use client";

import { ExternalLink } from "lucide-react";
import { logUserActivity } from "@/lib/logger";

interface VisitWebsiteButtonProps {
    websiteUrl: string;
    toolSlug: string;
    toolName: string;
}

export function VisitWebsiteButton({ websiteUrl, toolSlug, toolName }: VisitWebsiteButtonProps) {
    const handleClick = () => {
        logUserActivity("visit_website", toolSlug, { toolName, url: websiteUrl });
    };

    return (
        <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 ml-auto lg:ml-0"
        >
            Visit Website
            <ExternalLink className="h-4 w-4" />
        </a>
    );
}
