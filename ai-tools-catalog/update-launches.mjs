import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data/ai-tools.json');

import toolsData from './data/ai-tools.json' assert { type: 'json' };
const tools = toolsData;

const templates = [
    { version: "v1.0", desc: "Initial public release with core features." },
    { version: "v1.2", desc: "Performance improvements and bug fixes." },
    { version: "v2.0", desc: "Major overhaul with new AI engine and UI redesign.", isMajor: true },
    { version: "v2.1", desc: "Added API support and developer tools." },
    { version: "v2.5", desc: "Introduced collaborative features for teams." },
    { version: "v3.0", desc: "Next-gen model integration with 2x speed.", isMajor: true },
    { version: "v3.2", desc: "Enhanced security and enterprise compliance." },
];

const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

const updatedTools = tools.map((tool) => {
    // Generate 2-5 launches for each tool
    const numLaunches = Math.floor(Math.random() * 4) + 2;
    const launches = [];

    // Sort templates randomly but keep versions logical for the sake of the script (just picking random ones for now)
    // Actually, let's just pick a sequential slice to make sense
    const startIdx = Math.floor(Math.random() * 2);
    const selectedTemplates = templates.slice(startIdx, startIdx + numLaunches);

    let currentDate = new Date(2023, 0, 1);

    for (const temp of selectedTemplates) {
        currentDate = new Date(currentDate.getTime() + Math.random() * 1000 * 60 * 60 * 24 * 90); // Add 0-90 days
        launches.push({
            version: temp.version,
            date: currentDate.toISOString().split('T')[0],
            description: temp.desc,
            isMajor: temp.isMajor
        });
    }

    return {
        ...tool,
        launches: launches.reverse() // Newest first
    };
});

fs.writeFileSync(dataPath, JSON.stringify(updatedTools, null, 2));

console.log(`Updated ${updatedTools.length} tools with launches.`);
