import { getTrendingTools } from "@/lib/getTools";
import { ToolCard } from "@/components/ToolCard";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { Flame, Info } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trending AI Tools - Most Popular Right Now",
    description: "Discover the top 20 most used and trending AI tools on the internet.",
};

export default async function TrendingPage() {
    const tools = await getTrendingTools();

    return (
        <div className="space-y-12 pb-12">
            <FadeIn>
                <div className="text-center space-y-4 py-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-medium border border-orange-100 dark:border-orange-800">
                        <Flame className="h-4 w-4" />
                        <span>Hottest right now</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-orange-600 to-zinc-900 dark:from-white dark:via-orange-400 dark:to-white pb-2">
                        Trending AI Tools
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        The top 20 most popular AI tools dominating the internet this week.
                    </p>
                </div>
            </FadeIn>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex gap-3 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                <Info className="h-5 w-5 shrink-0 text-indigo-600" />
                <p>Ranking based on estimated global monthly traffic, user adoption rates, and social media mentions.</p>
            </div>

            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.map((tool, index) => (
                    <FadeInItem key={tool.id} className="h-full relative">
                        <div className="absolute -left-3 -top-3 z-10 h-8 w-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-900">
                            {index + 1}
                        </div>
                        <ToolCard tool={tool} />
                    </FadeInItem>
                ))}
            </FadeInStagger>
        </div>
    );
}
