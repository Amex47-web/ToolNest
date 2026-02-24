const Tool = require('../models/Tool');

const getTools = async (req, res) => {
    try {
        let query = {};

        if (req.query.search) {
            query.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        if (req.query.category) {
            // MongoDB arrays will match if the query category is an element in the array
            // We use RegExp for case-insensitive exact matching
            query.categories = { $regex: new RegExp(`^${req.query.category}$`, 'i') };
        }

        if (req.query.pricing) {
            query.pricing = { $regex: new RegExp(`^${req.query.pricing}$`, 'i') };
        }

        if (req.query.featured === 'true') {
            query.featured = true;
        }

        const tools = await Tool.find(query);
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
