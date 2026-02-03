import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <Logo className="h-8 w-8" showText={true} />
                        </Link>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 max-w-sm">
                            The ultimate directory for discovering the best AI tools.
                            Curated daily to help you stay ahead in the age of artificial intelligence.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="https://github.com" icon={<Github className="h-5 w-5" />} label="GitHub" />
                            <SocialLink href="https://twitter.com" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Product</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/tools">All Tools</FooterLink>
                            <FooterLink href="/trending">Trending</FooterLink>
                            <FooterLink href="/pricing/free">Free Tools</FooterLink>
                            <FooterLink href="/pricing/paid">Premium Tools</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Categories</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/best-for/engineering">Engineering</FooterLink>
                            <FooterLink href="/best-for/design">Design</FooterLink>
                            <FooterLink href="/best-for/marketing">Marketing</FooterLink>
                            <FooterLink href="/best-for/productivity">Productivity</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Company</h3>
                        <ul className="space-y-3">
                            <FooterLink href="#">About</FooterLink>
                            <FooterLink href="#">Blog</FooterLink>
                            <FooterLink href="#">Privacy Policy</FooterLink>
                            <FooterLink href="#">Terms of Service</FooterLink>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center md:text-left">
                        &copy; {new Date().getFullYear()} Ameya Balange. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
            aria-label={label}
        >
            {icon}
        </a>
    )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
                {children}
            </Link>
        </li>
    )
}
