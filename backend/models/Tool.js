const mongoose = require('mongoose');

const launchSchema = new mongoose.Schema({
    version: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    isMajor: { type: Boolean, default: false }
}, { _id: false });

const toolSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Keeping original ID for consistency, or we can rely on _id
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    categories: [{ type: String }],
    pricing: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String, required: true },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    rating: { type: Number, required: true, default: 0 },
    reviewCount: { type: Number, required: true, default: 0 },
    launches: [launchSchema]
}, {
    timestamps: true
});

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;
