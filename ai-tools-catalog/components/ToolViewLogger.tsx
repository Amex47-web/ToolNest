"use client";

import { useEffect } from "react";
import { logUserActivity } from "@/lib/logger";

interface ToolViewLoggerProps {
    toolSlug: string;
    toolName: string;
}

export function ToolViewLogger({ toolSlug, toolName }: ToolViewLoggerProps) {
    useEffect(() => {
        // Log view after a short delay to ensure it's a real visit
        const timer = setTimeout(() => {
            logUserActivity("view_tool", toolSlug, { toolName });
        }, 1000);

        return () => clearTimeout(timer);
    }, [toolSlug, toolName]);

    return null; // This component renders nothing
}
