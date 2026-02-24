import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data/ai-tools.json');

import toolsData from './data/ai-tools.json' assert { type: 'json' };
const tools = toolsData;

// Function to generate a random rating between 4.0 and 5.0
const getRandomRating = () => {
    return Number((4.0 + Math.random() * 1.0).toFixed(1));
};

// Function to generate a random review count between 10 and 5000
const getRandomReviewCount = () => {
    return Math.floor(Math.random() * 4990) + 10;
};

const updatedTools = tools.map(tool => ({
    ...tool,
    rating: tool.rating || getRandomRating(),
    reviewCount: tool.reviewCount || getRandomReviewCount()
}));

fs.writeFileSync(dataPath, JSON.stringify(updatedTools, null, 2));

console.log(`Updated ${updatedTools.length} tools with ratings.`);
