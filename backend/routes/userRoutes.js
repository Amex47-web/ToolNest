const express = require('express');
const router = express.Router();
const { syncUser, logActivity, getUserProfile } = require('../controllers/userController');

router.post('/sync', syncUser);
router.post('/activity', logActivity);
router.get('/:uid', getUserProfile);

module.exports = router;
