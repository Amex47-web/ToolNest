import { getFeaturedTools } from "@/lib/getTools";
import { ToolCard } from "@/components/ToolCard";
import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/FadeIn";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, TrendingUp, Zap, Target, Users, Globe } from "lucide-react";
import { AnimatedGridPattern } from "@/components/BackgroundPattern";
import { JSONLD } from "@/components/JSONLD";

export default async function Home() {
  const allFeaturedTools = await getFeaturedTools();
  const featuredTools = allFeaturedTools.slice(0, 6); // Top 6 featured
  const popularCategories = ["Chat", "Image Generation", "Copywriting", "Video", "Developer Tools", "Productivity"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolNest",
    "url": "https://ai-tools-catalog.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://ai-tools-catalog.vercel.app/tools?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="relative isolate overflow-hidden">
      <JSONLD data={jsonLd} />
      {/* Global Background Grid */}


      <div className="space-y-24 pb-20">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 text-center max-w-6xl mx-auto px-4 overflow-hidden">
          {/* Dynamic Background Animation */}
          <AnimatedGridPattern
            numSquares={60}
            maxOpacity={0.6}
            duration={2}
            repeatDelay={0.5}
            className={
              "text-indigo-500/30 dark:text-indigo-400/30 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
            }
          />

          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 border border-indigo-100 dark:border-indigo-800 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>The Curated Directory</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
              Discover the Best <br className="hidden md:block" />
              <span className="text-indigo-600 dark:text-indigo-400 inline-block">AI Tools</span> for Your Workflow
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop searching endlessly. We&apos;ve curated the top AI tools to help you build, design, and create faster than ever. Filter the noise and find your signal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tools"
                className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95"
              >
                Explore All Tools
              </Link>
              <Link
                href="/best-for/startups"
                className="px-8 py-4 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 font-semibold text-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95"
              >
                For Startups
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* Popular Categories */}
        <section className="space-y-8">
          <FadeIn delay={0.2} className="text-center">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">Popular Categories</h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3">
              {popularCategories.map((cat) => (
                <Link key={cat} href={`/category/${cat.toLowerCase().replace(' ', '-')}`}>
                  <Badge variant="outline" className="text-sm py-2 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {cat}
                  </Badge>
                </Link>
              ))}
            </div>
          </FadeIn>
        </section>



        {/* Vision / Why ToolNest */}
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-4xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">Why ToolNest?</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                The AI landscape is exploding. Every day, dozens of new tools launch on Product Hunt, Twitter, and specialized forums. It&apos;s overwhelming.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                ToolNest is your compass in the AI gold rush. We manually review, categorize, and tag every tool to ensure you only see what&apos;s worth your time. No vaporware, no broken links—just polished, production-ready AI software.
              </p>
              <ul className="space-y-4">
                {[
                  "Manually vetted tools only",
                  "Clear pricing transparency",
                  "Direct links to official sites",
                  "Categorized by use-case"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium">
                    <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                      <Target className="h-4 w-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.2} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10" />
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Supercharge Productivity</h3>
                    <p className="text-sm text-zinc-500">Save hours every week</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-24 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-700/50 flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 shrink-0"><Users className="h-5 w-5" /></div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">For Teams</div>
                      <div className="text-xs text-zinc-500">Collaborate with AI agents</div>
                    </div>
                  </div>
                  <div className="h-24 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-700/50 flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 shrink-0"><Globe className="h-5 w-5" /></div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Global Search</div>
                      <div className="text-xs text-zinc-500">Find tools for any market</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Featured Tools */}
        <section className="container mx-auto px-4 max-w-6xl space-y-12">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
                Featured Tools
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">Hand-picked selection of the most powerful tools.</p>
            </div>
            <Link href="/tools" className="text-indigo-600 hover:text-indigo-500 font-medium hidden md:block group">
              View all tools <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <FadeInItem key={tool.id} className="h-full">
                <ToolCard tool={tool} />
              </FadeInItem>
            ))}
          </FadeInStagger>

          <div className="md:hidden text-center pt-4">
            <Link href="/tools" className="text-indigo-600 hover:text-indigo-500 font-medium">View all tools &rarr;</Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <FadeIn className="bg-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to build the future?</h2>
              <p className="text-indigo-100 text-lg">
                Join thousands of creators using AI to ship faster. Browse our full directory and find your missing piece.
              </p>
              <Link
                href="/tools"
                className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Start Browsing Now
              </Link>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
