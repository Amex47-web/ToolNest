"use client";

import { useEffect, useId, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    strokeDasharray?: string | number;
    numSquares?: number;
    className?: string;
    maxOpacity?: number;
    duration?: number;
    repeatDelay?: number;
}

export function AnimatedGridPattern({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    strokeDasharray = 0,
    numSquares = 30,
    className,
    maxOpacity = 0.5,
    duration = 3,
    repeatDelay = 1,
    ...props
}: AnimatedGridPatternProps) {
    const id = useId();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [squares, setSquares] = useState<{ id: number; pos: [number, number] }[]>([]);

    const getPos = useCallback(() => {
        return [
            Math.floor(Math.random() * (dimensions.width / width)),
            Math.floor(Math.random() * (dimensions.height / height)),
        ] as [number, number];
    }, [dimensions, width, height]);

    const generateSquares = useCallback((count: number) => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            pos: getPos(),
        }));
    }, [getPos]);

    // Instead of using useEffect to setSquares which causes a warning, 
    // we use a single mounted effect to generate the initial squares once dimensions are set.
    useEffect(() => {
        if (typeof window !== "undefined") {
            const updateDimensions = () => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };
            updateDimensions();
            window.addEventListener("resize", updateDimensions);
            return () => window.removeEventListener("resize", updateDimensions);
        }
    }, []);

    // Effect to generate squares only when dimensions change significantly or on mount
    useEffect(() => {
        if (dimensions.width > 0 && dimensions.height > 0 && squares.length === 0) {
            setSquares(generateSquares(numSquares));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dimensions.width, dimensions.height, numSquares, generateSquares]);

    return (
        <div className={cn("absolute inset-x-0 -top-10 -z-30 h-[800px] w-full [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)]", className)}>
            <svg
                aria-hidden="true"
                className="absolute inset-x-0 -top-10 h-[100%] w-full fill-gray-100 stroke-gray-900/10 dark:fill-gray-900/10 dark:stroke-gray-100/10"
                {...props}
            >
                <defs>
                    <pattern
                        id={id}
                        width={width}
                        height={height}
                        patternUnits="userSpaceOnUse"
                        x={x}
                        y={y}
                    >
                        <path
                            d={`M.5 ${height}V.5H${width}`}
                            fill="none"
                            strokeDasharray={strokeDasharray}
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

                {/* Animated Beams */}
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(({ pos: [x, y], id }, index) => (
                        <motion.rect
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, maxOpacity, 0] }}
                            transition={{
                                duration,
                                repeat: Infinity,
                                delay: index * 0.1,
                                repeatDelay,
                            }}
                            onAnimationComplete={() => {
                                setSquares((prev) => {
                                    const next = [...prev];
                                    next[index] = { id, pos: getPos() };
                                    return next;
                                });
                            }}
                            key={`${x}-${y}-${index}`}
                            width={width - 1}
                            height={height - 1}
                            x={x * width + 1}
                            y={y * height + 1}
                            fill="currentColor"
                            strokeWidth="0"
                        />
                    ))}
                </svg>
            </svg>
        </div>
    );
}
