# ToolNest

A polished, high-performance directory for discovering the best AI tools, built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

##  Project Overview

This project is a modern, responsive content directory designed to showcase AI tools across various categories (Chat, Image Generation, Coding, etc.). It features:
- **Fast Performance**: Uses Static Site Generation (SSG) with Incremental Static Regeneration (ISR).
- **Search & Filter**: Real-time client-side filtering by category and pricing.
- **Dark Mode**: Fully supported dark/light themes.
- **SEO Optimized**: Dynamic metadata and sitemap generation.
- **Clean UI**: Minimalist design inspired by modern SaaS directories.

##  Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theming**: next-themes
- **Deployment**: Vercel-ready

##  Dataset Used

The dataset is located in `data/ai-tools.json` and contains ~50 AI tools. 
**Source URL**: [Self-Generated / Mock Data] based on general knowledge of popular AI tools in 2024 (ChatGPT, Midjourney, Jasper, etc.).

##  How it was Scraped/Generated

The dataset was **generated programmatically** using custom Node.js scripts (`update-ratings.js`, `update-launches.js`) and LLM assistance.
1.  **Initial Population**: An initial list of 50 tools was created manually with core fields (`name`, `slug`, `pricing`, `categories`).
2.  **Enrichment Scripts**:
    - `update-ratings.js`: Automated script to assign randomized 4.0-5.0 star ratings and review counts to simulate a live user base.
    - `update-launches.js`: Script to generate version history (timeline) for each tool, creating realistic "Launch" events with dates and version numbers.
3.  **Smart Content**: The `lib/smartContent.ts` utility generates "Features", "Use Cases", and "Pros/Cons" dynamically based on the tool's description and category, avoiding the need for manual data entry for these fields.

##  Tech Stack & Design Inspiration

### Tech Stack
-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript 
-   **Styling**: Tailwind CSS
-   **Animation**: Framer Motion (Scroll animations, hero effects)
-   **Icons**: Lucide React
-   **Theming**: next-themes (Dark/Light mode)

### Design Inspiration
-   **Vercel**: For the clean, monochrome aesthetic and card designs.
-   **Linear**: For the subtle gradients, bento-grid layouts, and high-quality micro-interactions.
-   **SaaS Landing Pages**: General modern patterns for effective conversion (CTA placement, feature highlighting).

##  AI Prompt Examples Used

Here are 3 prompt examples used during development:

1.  **For Animation**: *"Create a 'Grid Beams' background animation using Framer Motion. It should be a grid of squares where random paths of light travel along the grid lines, fading out after a few seconds. Make it black and white compatible."*
2.  **For Data Generation**: *"Write a Node.js script that iterates through my `ai-tools.json` file. For each tool, add a `launches` array containing 3-5 release events (e.g., 'v1.0 Launch', 'v2.0 Update') with realistic past dates. Save the file in place."*
3.  **For CSS Layout**: *"I have a 3-column grid for my tool detail page. Move the 'Pros/Cons' section from the right sidebar to the main content area below the timeline, and change the layout to a symmetric 2-column grid. Ensure it collapses to 1 column on mobile."*

##  Future Improvements (With 2 More Days)

1.  **Real Database & CMS**: Migrate from JSON to a Postgres database (Supabase) + a headless CMS (Sanity) to allow non-developers to manage tool listings.
2.  **User Authentication**: Implement Clerk for user login, allowing users to "Bookmark" tools, leave real reviews, and submit new tools.
3.  **Vector Search**: Replace the basic string matching with semantic search (using OpenAI embeddings + Pinecone) to allow users to ask questions like "Find me a tool for editing podcasts" and get relevant results even if keywords don't match exactly.

##  Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

##  Verification

- `npm run build` passes with no errors.
- `npm run lint` passes with no errors.
