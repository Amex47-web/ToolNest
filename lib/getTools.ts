import { Tool, ToolPricing } from "@/types";
import toolsData from "@/data/ai-tools.json";

// Explicitly cast the json data to Tool[] to ensure safety
const tools: Tool[] = toolsData as Tool[];

export function getAllTools(): Tool[] {
    return tools;
}

export function getToolBySlug(slug: string): Tool | undefined {
    return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
    return tools.filter((tool) =>
        tool.categories.some((c) => c.toLowerCase() === category.toLowerCase())
    );
}

export function getToolsByPricing(pricing: ToolPricing | string): Tool[] {
    return tools.filter(
        (tool) => tool.pricing.toLowerCase() === pricing.toLowerCase()
    );
}

export function getFeaturedTools(): Tool[] {
    return tools.filter((tool) => tool.featured);
}

// Simulated "Trending" based on popular tools
export function getTrendingTools(): Tool[] {
    const popularSlugs = [
        "chatgpt", "midjourney", "jasper", "copy-ai", "github-copilot",
        "stable-diffusion", "dall-e-3", "runway", "synthesia", "notion-ai",
        "grammarly", "canva-magic-studio", "beautiful-ai", "tome",
        "gamma", "perplexity", "claude", "bard", "murf-ai", "descript"
    ];

    // Return tools that match the popular slugs, preserving the order of popularity
    const trending = popularSlugs
        .map(slug => tools.find(t => t.slug === slug))
        .filter((t): t is Tool => t !== undefined);

    // Fill up to 20 with other tools if specific ones aren't found
    if (trending.length < 20) {
        const remaining = tools
            .filter(t => !trending.find(tr => tr.id === t.id))
            .slice(0, 20 - trending.length);
        return [...trending, ...remaining];
    }

    return trending;
}

export function getAllCategories(): string[] {
    const categories = new Set<string>();
    tools.forEach((tool) => {
        tool.categories.forEach((c) => categories.add(c));
    });
    return Array.from(categories).sort();
}

export function getSimilarTools(tool: Tool): Tool[] {
    return tools
        .filter(
            (t) =>
                t.id !== tool.id &&
                t.categories.some((c) => tool.categories.includes(c))
        )
        .slice(0, 3);
}

export function searchTools(query: string): Tool[] {
    const q = query.toLowerCase();
    return tools.filter(
        (tool) =>
            tool.name.toLowerCase().includes(q) ||
            tool.description.toLowerCase().includes(q)
    );
}
