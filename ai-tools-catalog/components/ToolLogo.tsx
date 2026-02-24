"use client";

import { useState } from "react";
import Image from "next/image";

interface ToolLogoProps {
    src: string;
    alt: string;
    className?: string;
    fallbackText: string;
}

export function ToolLogo({ src, alt, className, fallbackText, website }: { src?: string; alt: string; className?: string; fallbackText: string; website?: string }) {
    const [imageSrc, setImageSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        // If we haven't tried the favicon yet and we have a website, try that
        if (imageSrc === src && website) {
            try {
                const domain = new URL(website).hostname;
                setImageSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
            } catch (e) {
                setHasError(true);
            }
        } else {
            // Already tried key or favicon, give up
            setHasError(true);
        }
    };

    if (hasError || (!src && !website)) {
        return (
            <div className={`flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 ${className}`}>
                <span className="text-4xl font-bold text-zinc-400 dark:text-zinc-600 select-none">
                    {fallbackText.charAt(0).toUpperCase()}
                </span>
            </div>
        );
    }

    return (
        <Image
            src={imageSrc || ""}
            alt={alt}
            className={className}
            onError={handleError}
            width={128}
            height={128}
            unoptimized={true}
        />
    );
}
