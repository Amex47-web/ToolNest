import { Tool } from "@/types";

// Dynamic content generation based on tool categories and metadata
// This ensures every tool has rich content without manual data entry for hundreds of items

const CATEGORY_FEATURES: Record<string, string[]> = {
    "Chat": [
        "Natural Language Understanding",
        "Context-aware responses",
        "Multi-turn conversation capability",
        "Prompt template support",
        "History & session management"
    ],
    "Image Generation": [
        "Text-to-Image synthesis",
        "High-resolution output",
        "Style transfer capabilities",
        "Inpainting and Outpainting",
        "Customizable aspect ratios"
    ],
    "Video": [
        "AI-powered video editing",
        "Automated scene detection",
        "Text-to-Video generation",
        "Voice synthesis synchronization",
        "Background removal"
    ],
    "Copywriting": [
        "SEO-optimized content generation",
        "Multiple tone of voice options",
        "Plagiarism checking",
        "Blog post outlining",
        "Social media caption generation"
    ],
    "Developer Tools": [
        "Code completion & suggestion",
        "Automated refactoring",
        "Bug detection & explanation",
        "Multi-language support",
        "API integration helpers"
    ],
    "Productivity": [
        "Workflow automation",
        "Smart summarization",
        "Task management integration",
        "Real-time collaboration",
        "Document analysis"
    ],
    "Audio": [
        "Text-to-Speech synthesis",
        "Noise cancellation",
        "Voice cloning",
        "Audio transcription",
        "Music generation"
    ],
    "Design": [
        "Automated layout generation",
        "Color palette suggestions",
        "Asset generation",
        "UI/UX prototyping",
        "Vector conversion"
    ]
};

const COMMON_FEATURES = [
    "Cloud-based processing",
    "User-friendly interface",
    "Regular AI model updates",
    "Data privacy controls"
];

export function getSmartFeatures(tool: Tool): string[] {
    // Combine features from all matching categories
    const categoryFeatures = tool.categories.flatMap(cat => CATEGORY_FEATURES[cat] || []);

    // Mix in some common features
    const features = [...new Set([...categoryFeatures, ...COMMON_FEATURES])];

    // Return top 6-8 distinct features
    return features.slice(0, 8);
}

export function getSmartUseCases(tool: Tool): string[] {
    const useCases: string[] = [];

    if (tool.categories.includes("Chat")) {
        useCases.push("Brainstorming creative ideas", "Customer support automation", "Learning new topics");
    }
    if (tool.categories.includes("Image Generation")) {
        useCases.push("Creating marketing assets", "Concept art generation", "Social media visuals");
    }
    if (tool.categories.includes("Developer Tools")) {
        useCases.push("Accelerating software development", "Debugging complex code", "Writing documentation");
    }
    if (tool.categories.includes("Copywriting")) {
        useCases.push("Writing blog posts", "Crafting email campaigns", "Generating ad copy");
    }

    // Fallbacks
    if (useCases.length < 3) {
        useCases.push(
            "Streamlining daily workflows",
            "Enhancing creative output",
            "Automating repetitive tasks"
        );
    }

    return [...new Set(useCases)].slice(0, 4);
}

export function getExtendedDescription(tool: Tool): string {
    // If the description is very short, enhance it.
    const categoryString = tool.categories.join(" and ");

    return `
    ${tool.name} is a cutting-edge AI solution specializing in ${categoryString}. 
    Designed for professionals and creators, it leverages advanced machine learning models to deliver exceptional results. 
    Whether you are looking to enhance your productivity or unlock new creative possibilities, ${tool.name} provides the tools you need.
    It fits seamlessly into modern workflows, offering a ${tool.pricing.toLowerCase()} pricing model that makes it accessible for users of various needs.
  `.trim().replace(/\s+/g, ' ');
}

export function getProsAndCons(tool: Tool): { pros: string[], cons: string[] } {
    return {
        pros: [
            `Specialized in ${tool.categories[0]}`,
            "Intuitive user experience",
            "Fast processing speed",
            tool.pricing === "Free" ? "Completely free to use" : "Professional grade capabilities"
        ],
        cons: [
            "Requires internet connection",
            tool.pricing === "Paid" ? "Premium subscription required for full access" : "Some advanced features may be limited"
        ]
    };
}
