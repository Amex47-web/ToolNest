const express = require('express');
const router = express.Router();
const { getTools, getToolBySlug } = require('../controllers/toolController');

router.get('/', getTools);
router.get('/:slug', getToolBySlug);

module.exports = router;
