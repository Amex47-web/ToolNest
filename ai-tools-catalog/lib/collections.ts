import { Tool } from "@/types";
import { getAllTools } from "./getTools";

export interface Collection {
    slug: string;
    title: string;
    description: string;
    filter: (tool: Tool) => boolean;
}

export const COLLECTIONS: Collection[] = [
    {
        slug: "engineering",
        title: "Best AI Tools for Engineering",
        description: "Top AI coding assistants, IDE plugins, and developer tools to boost your programming workflow.",
        filter: (tool) =>
            tool.categories?.some(c => ["Developer Tools", "Code Assistant", "DevOps", "Open Source"].includes(c)) ||
            tool.tags?.some(t => ["Coding", "Programming", "IDE", "SQL", "Git"].includes(t)) || false
    },
    {
        slug: "marketing",
        title: "Best AI Tools for Marketing",
        description: "Generate ad copy, social media posts, and optimize your SEO with these top marketing AI tools.",
        filter: (tool) =>
            tool.categories?.some(c => ["Marketing", "Copywriting", "SEO", "Social Media"].includes(c)) ||
            tool.tags?.some(t => ["Ads", "Email", "Content"].includes(t)) || false
    },
    {
        slug: "design",
        title: "Best AI Tools for Design",
        description: "Create stunning visuals, logos, and UI designs with these generative AI art and design tools.",
        filter: (tool) =>
            tool.categories?.some(c => ["Image Generation", "Design", "Art", "3D"].includes(c)) ||
            tool.tags?.some(t => ["UI", "UX", "Logo", "Web Design"].includes(t)) || false
    },
    {
        slug: "productivity",
        title: "Best AI Tools for Productivity",
        description: "Automate tasks, summarize meetings, and organize your work with these AI productivity boosters.",
        filter: (tool) =>
            tool.categories?.some(c => ["Productivity", "Notes", "Automation"].includes(c)) ||
            tool.tags?.some(t => ["Spreadsheets", "Resume", "Meetings"].includes(t)) || false
    },
    {
        slug: "video",
        title: "Best AI Tools for Video Creation",
        description: "Generate, edit, and repurpose videos for social media and marketing with AI.",
        filter: (tool) =>
            tool.categories?.some(c => ["Video", "Editor", "Animation"].includes(c)) ||
            tool.tags?.some(t => ["YouTube", "TikTok", "Shorts"].includes(t)) || false
    },
    {
        slug: "research",
        title: "Best AI Tools for Research",
        description: "Accelerate your learning and research with AI-powered search engines and document chat tools.",
        filter: (tool) =>
            tool.categories?.some(c => ["Search", "Research"].includes(c)) ||
            tool.tags?.some(t => ["PDF", "Knowledge"].includes(t)) || false
    },
    {
        slug: "audio",
        title: "Best AI Tools for Audio & Music",
        description: "Create music, clone voices, and generate speech with these state-of-the-art audio AI tools.",
        filter: (tool) =>
            tool.categories?.some(c => ["Audio", "Music", "Voice"].includes(c)) ||
            tool.tags?.some(t => ["TTS", "Podcasting"].includes(t)) || false
    },
    {
        slug: "startups",
        title: "Best AI Tools for Startups",
        description: "Essential AI tools to help you build, launch, and grow your startup faster.",
        filter: (tool) =>
            tool.categories?.some(c => ["Marketing", "Productivity", "Code Assistant", "Design"].includes(c)) &&
            (tool.pricing === "Free" || tool.pricing === "Freemium")
    }
];

export function getCollectionBySlug(slug: string): Collection | undefined {
    return COLLECTIONS.find(c => c.slug === slug);
}

export async function getToolsInCollection(collection: Collection): Promise<Tool[]> {
    const tools = await getAllTools();
    return tools.filter(collection.filter);
}
