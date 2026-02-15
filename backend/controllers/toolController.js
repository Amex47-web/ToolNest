const Tool = require('../models/Tool');

const getTools = async (req, res) => {
    try {
        const tools = await Tool.find();
        res.json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getToolBySlug = async (req, res) => {
    try {
        const tool = await Tool.findOne({ slug: req.params.slug });
        if (tool) {
            res.json(tool);
        } else {
            res.status(404).json({ message: 'Tool not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTools, getToolBySlug };
