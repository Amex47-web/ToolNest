import { getAllCategories, getAllTools } from "@/lib/getTools";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://ai-tools-catalog.vercel.app"; // Placeholder URL
    const tools = await getAllTools();
    const categories = await getAllCategories();

    // Static routes
    const routes = [
        "",
        "/tools",
        "/trending",
        "/login",
        "/signup",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    // Tool routes
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: new Date(),
    }));

    // Category routes
    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/category/${cat.toLowerCase()}`,
        lastModified: new Date(),
    }));

    // Pricing routes
    const pricingRoutes = ["free", "freemium", "paid"].map((price) => ({
        url: `${baseUrl}/pricing/${price}`,
        lastModified: new Date(),
    }));

    // Top routes
    const topRoutes = categories.map((cat) => ({
        url: `${baseUrl}/top/${cat.toLowerCase()}`,
        lastModified: new Date(),
    }));

    return [...routes, ...toolRoutes, ...categoryRoutes, ...pricingRoutes, ...topRoutes];
}
