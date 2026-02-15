export type ToolPricing = "Free" | "Freemium" | "Paid";

export interface Tool {
    id: string;
    name: string;
    slug: string;
    description: string;
    categories: string[];
    pricing: ToolPricing;
    website: string;
    logo: string;
    tags?: string[];
    featured?: boolean;
    rating?: number;
    reviewCount?: number;
    launches?: Launch[];
}

export interface Launch {
    version: string;
    date: string;
    description: string;
    isMajor?: boolean;
}

export type ToolCategory = string;
