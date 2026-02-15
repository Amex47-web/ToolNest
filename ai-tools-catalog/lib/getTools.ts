import { Tool, ToolPricing } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

async function fetchTools(): Promise<Tool[]> {
    try {
        const res = await fetch(`${API_URL}/tools`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch tools');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching tools:', error);
        return [];
    }
}

export async function getAllTools(): Promise<Tool[]> {
    return await fetchTools();
}

export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
    try {
        const res = await fetch(`${API_URL}/tools/${slug}`, { cache: 'no-store' });
        if (!res.ok) {
            // Fallback to fetching all and finding if individual endpoint fails or returns 404 handled differently
            // But actually let's trust the endpoint.
            if (res.status === 404) return undefined;
            throw new Error('Failed to fetch tool');
        }
        return res.json();
    } catch (error) {
        console.error(`Error fetching tool ${slug}:`, error);
        return undefined;
    }
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
    const tools = await fetchTools();
    return tools.filter((tool) =>
        tool.categories.some((c) => c.toLowerCase() === category.toLowerCase())
    );
}

export async function getToolsByPricing(pricing: ToolPricing | string): Promise<Tool[]> {
    const tools = await fetchTools();
    return tools.filter(
        (tool) => tool.pricing.toLowerCase() === pricing.toLowerCase()
    );
}

export async function getFeaturedTools(): Promise<Tool[]> {
    const tools = await fetchTools();
    return tools.filter((tool) => tool.featured);
}

// Simulated "Trending" based on popular tools
export async function getTrendingTools(): Promise<Tool[]> {
    const tools = await fetchTools();
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

export async function getAllCategories(): Promise<string[]> {
    const tools = await fetchTools();
    const categories = new Set<string>();
    tools.forEach((tool) => {
        tool.categories.forEach((c) => categories.add(c));
    });
    return Array.from(categories).sort();
}

export async function getSimilarTools(tool: Tool): Promise<Tool[]> {
    const tools = await fetchTools();
    return tools
        .filter(
            (t) =>
                t.id !== tool.id &&
                t.categories.some((c) => tool.categories.includes(c))
        )
        .slice(0, 3);
}

export async function searchTools(query: string): Promise<Tool[]> {
    const tools = await fetchTools();
    const q = query.toLowerCase();
    return tools.filter(
        (tool) =>
            tool.name.toLowerCase().includes(q) ||
            tool.description.toLowerCase().includes(q)
    );
}
