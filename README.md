# ToolNest 🛠️✨

> **The Premier AI Tools Curated Directory**

ToolNest is a full-stack web platform built for discovering, evaluating, and managing the best AI tools on the market. Engineered with cutting-edge web technologies, it features an interactive Next.js application frontend powered by a robust Express/MongoDB backend, perfectly unified to deliver smooth search, rich dynamic content, and secure user authentication.

[![Live Demo](https://img.shields.io/badge/Demo-Live_Preview-blue.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#)

---

## 🚀 Key Features

### Frontend (Client-Side Interactivity)
- **Advanced Search & Filtering**: Client-side filtering (`ToolBrowser.tsx`) enabling near-instant search across tool names, categories, and pricing dimensions, syncing perfectly with URL parameters for shareable states.
- **Dynamic Content Generation**: Uses an intelligent `smartContent.ts` module to parse tool categories and auto-generate rich, SEO-friendly content like pros/cons, extended descriptions, and smart use-cases on the fly.
- **Fluid UI & Animations**: Built using **Framer Motion** for polished micro-interactions (staggered fade-ins, timeline reveals) and **Tailwind CSS 4** for responsive, mobile-first design.
- **Dark/Light Mode**: Seamless user theme preferences managed via `next-themes` and a custom toggle system, persisting user preferences effortlessly.
- **SEO Optimized**: Deeply integrated JSON-LD structured data and semantic HTML to ensure extreme discoverability on search engines.

### Backend & Authentication
- **RESTful API Architecture**: Decoupled Node.js + Express backend serving performant JSON endpoints for Tool querying and User management.
- **Scalable Data Models**: Designed with strict **Mongoose** schemas separating `Tools` (categories, pricing, ratings, launch histories) and `Users` (activity logs, Firebase UIDs).
- **Secure Authentication**: Leverages **Firebase Authentication** on the client, securely syncing session and identity states to the MongoDB store (via the `/api/users/sync` endpoint).
- **User Activity Tracking**: Logs user browsing actions (like viewing a tool logic via `ToolViewLogger`) securely into the MongoDB profile model.

---

## 💻 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router), React 19 |
| **Styling & UI** | Tailwind CSS 4, Framer Motion, Lucide React Icons |
| **Authentication** | Firebase Auth |
| **Backend Server** | Node.js, Express.js, CORS |
| **Database & ORM** | MongoDB, Mongoose |
| **Language** | TypeScript (Frontend), JavaScript (Backend) |

---

## 📂 Architecture Overview

### `ai-tools-catalog` (Frontend)
Utilizes the Next.js App Router paradigm. 
- `app/`: Houses heavily optimized page routes (`/tools`, `/category`, `/login`, `/profile`).
- `components/`: Contains highly reusable UI components (`ToolCard.tsx`, `ToolBrowser.tsx`, `LaunchesTimeline.tsx`).
- `lib/`: Encapsulates logic for data fetching (`getTools.ts`), smart content rendering (`smartContent.ts`), and Firebase initialization (`firebase.ts`).
- `context/`: Maintains global application states like identity (`AuthContext.tsx`).

### `backend` (API Layer)
Node JS service for database interactions.
- `models/`: Mongoose schemas defining the structure for `Tool` and `User`.
- `controllers/`: Core business logic serving JSON responses (`toolController.js`, `userController.js`).
- `routes/`: Express endpoint wiring exposing APIs like `/api/tools/:slug` and `/api/users/sync`.
- `config/`: MongoDB connection string manager (`db.js`).

---

## 🛠️ Setup & Local Development

To run this project locally, you will need Node.js and a MongoDB instance (or Atlas string).

### 1. Clone the repository
```bash
git clone https://github.com/Amex47-web/ToolNest.git
cd ToolNest
```

### 2. Backend Initialization
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Initialization
```bash
cd ../ai-tools-catalog
npm install
```
Create a `.env.local` file in the `ai-tools-catalog/` directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
...
```
Start the Next.js development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` and the API running on `http://localhost:5000`.

---

## 📈 Future Roadmap
- [ ] Incorporating WebSockets for real-time multiplayer cursor interactions.
- [ ] Admin dashboard to curate and instantly ingest new tools using an LLM pipeline.
- [ ] Server-side pagination and infinite scroll using React Suspense.

---

*This project represents advanced proficiency in building modular, production-ready full-stack applications.*
