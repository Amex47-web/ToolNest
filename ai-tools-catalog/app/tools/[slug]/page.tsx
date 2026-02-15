import { getAllTools, getSimilarTools, getToolBySlug } from "@/lib/getTools";
import { Badge } from "@/components/ui/Badge";
import { ToolCard } from "@/components/ToolCard";
import { ToolLogo } from "@/components/ToolLogo";
import { ArrowLeft, ExternalLink, Globe, Check, X as XIcon, Zap, LayoutGrid, Target, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tool } from "@/types";
import { getSmartFeatures, getSmartUseCases, getExtendedDescription, getProsAndCons } from "@/lib/smartContent";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { AlternativesSection } from "@/components/AlternativesSection";
import { LaunchesTimeline } from "@/components/LaunchesTimeline";
import { JSONLD } from "@/components/JSONLD";
import { ToolViewLogger } from "@/components/ToolViewLogger";
import { VisitWebsiteButton } from "@/components/VisitWebsiteButton";

export async function generateStaticParams() {
    const tools = await getAllTools();
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export const dynamicParams = false;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const tool = await getToolBySlug(slug);

    if (!tool) {
        return {
            title: "Tool Not Found",
        };
    }

    return {
        title: `${tool.name} - Features, Pricing & Reviews`,
        description: tool.description,
        keywords: [...tool.categories, "AI tool", "artificial intelligence", "software review", tool.name],
        openGraph: {
            title: `${tool.name} - Features, Pricing & Reviews | ToolNest`,
            description: tool.description,
            images: [
                {
                    url: tool.logo, // In a real app, this would be a generated OG image
                    width: 800,
                    height: 600,
                    alt: `${tool.name} Logo`,
                },
            ],
            type: "article",
            tags: tool.categories,
        },
        twitter: {
            card: "summary",
            title: `${tool.name} - AI Tool Review`,
            description: tool.description,
            images: [tool.logo],
        },
    };
}

export default async function ToolPage({ params }: PageProps) {
    const { slug } = await params;
    const tool = await getToolBySlug(slug);

    if (!tool) {
        notFound();
    }

    const similarTools = await getSimilarTools(tool);
    const features = getSmartFeatures(tool);
    const useCases = getSmartUseCases(tool);
    const extendedDesc = getExtendedDescription(tool);
    const { pros, cons } = getProsAndCons(tool);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": tool.pricing === "Free" ? "0" : "0", // Simplified logic, can be enhanced
            "priceCurrency": "USD"
        },
        "aggregateRating": tool.rating ? {
            "@type": "AggregateRating",
            "ratingValue": tool.rating,
            "reviewCount": tool.reviewCount,
            "bestRating": "5",
            "worstRating": "1"
        } : undefined
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            <JSONLD data={jsonLd} />
            <ToolViewLogger toolSlug={tool.slug} toolName={tool.name} />


            {/* Header Section */}
            <FadeIn>
                <div className="mb-8">
                    <Link
                        href="/tools"
                        className="inline-flex items-center text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Tools
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                        <div className="flex-shrink-0">
                            <div className="h-40 w-40 rounded-3xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-6 shadow-lg">
                                <ToolLogo
                                    src={tool.logo}
                                    alt={tool.name}
                                    fallbackText={tool.name}
                                    website={tool.website}
                                    className="h-28 w-28 object-contain"
                                />
                            </div>
                        </div>

                        <div className="flex-grow space-y-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">{tool.name}</h1>
                                {tool.rating && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-5 w-5 ${i < Math.floor(tool.rating!) ? "fill-amber-400 text-amber-400" : "fill-zinc-200 dark:fill-zinc-700 text-zinc-200 dark:text-zinc-700"}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="font-bold text-zinc-900 dark:text-zinc-50 text-lg">{tool.rating}</span>
                                        <span className="text-zinc-500 dark:text-zinc-400">({tool.reviewCount} reviews)</span>
                                    </div>
                                )}
                                <p className="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
                                    {tool.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Badge variant={tool.pricing === "Free" ? "pricing" : "secondary"} className="text-base px-4 py-1.5">
                                    {tool.pricing}
                                </Badge>
                                {tool.categories.map((cat) => (
                                    <Badge key={cat} variant="secondary" className="text-base px-4 py-1.5">
                                        {cat}
                                    </Badge>
                                ))}
                                {tool.website && (
                                    <VisitWebsiteButton
                                        websiteUrl={tool.website}
                                        toolSlug={tool.slug}
                                        toolName={tool.name}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Main Content */}
                <div className="lg:col-span-1 space-y-12">

                    {/* About */}
                    <FadeIn delay={0.1}>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                                <InfoIcon />
                                About {tool.name}
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                <p>{extendedDesc}</p>
                                <p className="mt-4">
                                    {tool.name} helps users by integrating powerful AI capabilities directly into their workflow.
                                    Whether you are an individual creator or part of a large enterprise, the features provided by {tool.name}
                                    are designed to save time and improve output quality.
                                </p>
                            </div>
                        </section>
                    </FadeIn>

                    {/* Features Grid */}
                    <FadeIn delay={0.2}>
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                                <Zap className="h-6 w-6 text-indigo-500" />
                                Key Features
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                                        <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="text-zinc-700 dark:text-zinc-300 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeIn>

                    {/* Use Cases */}
                    <FadeIn delay={0.3}>
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                                <Target className="h-6 w-6 text-purple-500" />
                                Common Use Cases
                            </h2>
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                                <ul className="space-y-4">
                                    {useCases.map((useCase, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-purple-500" />
                                            <span className="text-zinc-700 dark:text-zinc-300 text-lg">{useCase}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </FadeIn>

                </div>

                <div className="space-y-12">
                    {/* Launches History */}
                    <FadeIn delay={0.35}>
                        <LaunchesTimeline launches={tool.launches || []} />
                    </FadeIn>

                    {/* At a Glance (Pros/Cons) */}
                    <FadeIn delay={0.4}>
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                                <LayoutGrid className="h-6 w-6 text-zinc-400" />
                                At a Glance
                            </h2>
                            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 font-medium">Pros</div>
                                            <ul className="space-y-3">
                                                {pros.map((pro, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                                        {pro}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 font-medium">Cons</div>
                                            <ul className="space-y-3">
                                                {cons.map((con, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                                        <XIcon className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                                        {con}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-end border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800 pt-6 md:pt-0 md:pl-8">
                                        <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-3">Share this tool</h4>
                                        <div className="flex flex-col gap-3">
                                            <button className="w-full py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                                                Copy Link
                                            </button>
                                            <button className="w-full py-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center gap-2">
                                                Share on Twitter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeIn>
                </div>

            </div>

            {/* Alternatives Section */}
            <FadeIn delay={0.5}>
                <AlternativesSection currentToolName={tool.name} alternatives={similarTools} />
            </FadeIn>
        </div>
    );
}

function InfoIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
    )
}
