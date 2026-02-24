import { Tool, ToolPricing } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

async function fetchTools(queryString: string = ''): Promise<Tool[]> {
    try {
        const url = queryString ? `${API_URL}/tools?${queryString}` : `${API_URL}/tools`;
        const res = await fetch(url, { next: { revalidate: 3600 } });
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
        const res = await fetch(`${API_URL}/tools/${slug}`, { next: { revalidate: 3600 } });
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
    return await fetchTools(`category=${encodeURIComponent(category)}`);
}

export async function getToolsByPricing(pricing: ToolPricing | string): Promise<Tool[]> {
    return await fetchTools(`pricing=${encodeURIComponent(pricing)}`);
}

export async function getFeaturedTools(): Promise<Tool[]> {
    return await fetchTools(`featured=true`);
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
    // If the tool has categories, try to get tools from the first category up to a limit
    // We fetch one category to rely on backend filtering, then filter out the current tool.
    if (!tool.categories || tool.categories.length === 0) return [];

    const similar = await getToolsByCategory(tool.categories[0]);
    return similar.filter((t) => t.id !== tool.id).slice(0, 3);
}

export async function searchTools(query: string): Promise<Tool[]> {
    return await fetchTools(`search=${encodeURIComponent(query)}`);
}
