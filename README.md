# ToolNest

A polished, high-performance directory for discovering the best AI tools, built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## 🚀 Project Overview

This project is a modern, responsive content directory designed to showcase AI tools across various categories (Chat, Image Generation, Coding, etc.). It features:
- **Fast Performance**: Uses Static Site Generation (SSG) with Incremental Static Regeneration (ISR).
- **Search & Filter**: Real-time client-side filtering by category and pricing.
- **Dark Mode**: Fully supported dark/light themes.
- **SEO Optimized**: Dynamic metadata and sitemap generation.
- **Clean UI**: Minimalist design inspired by modern SaaS directories.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theming**: next-themes
- **Deployment**: Vercel-ready

## 📂 Dataset

The dataset is located in `data/ai-tools.json` and contains ~50 AI tools.
I structued the data to include:
- `slug` (URL-safe identifier)
- `categories` (Array of strings for filtering)
- `pricing` (Free/Freemium/Paid)
- `logo` (Placeholder or real URLs)

**Source References**:
- Data simulated based on popular tools found on "There's An AI For That" and "Product Hunt".
- Logos sourced from official websites or placeholders.

## 🎨 Design Inspiration

- **Dribbble**: Clean card layouts with soft shadows.
- **Awwwards**: Minimalist typography and interaction states.
- **SaaS Interfaces**: Linear.app, Vercel design system.

## 🤖 AI Prompts Used

1.  "Generate a JSON dataset of 50 popular AI tools with fields: id, name, slug, description, categories, pricing, website, logo."
2.  "Create a Tailwind CSS component for a tool card that shows pricing badge, categories, and has a hover effect."

## 🔮 Future Improvements (With 2 More Days)

1.  **User Submission**: Add a form for users to submit new tools (using Server Actions).
2.  **Authentication**: Add user accounts (Clerk/NextAuth) to save "Favorite" tools.
3.  **Real Data Fetching**: Integrate with a real database (Postgres) instead of static JSON for larger scale.
4.  **View Counts**: Add a view counter for each tool to show popularity.

## 📦 Getting Started

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

## ✅ Verification

- `npm run build` passes with no errors.
- `npm run lint` passes with no errors.
