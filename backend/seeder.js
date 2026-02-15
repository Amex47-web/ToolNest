const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Tool = require('./models/Tool');
const tools = require('../ai-tools-catalog/data/ai-tools.json');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Tool.deleteMany();

        await Tool.insertMany(tools);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Tool.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
