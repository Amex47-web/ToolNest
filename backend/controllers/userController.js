const User = require('../models/User');

// @desc    Sync user profile from Firebase
// @route   POST /api/users/sync
// @access  Public (Protected by Firebase token on frontend, verified here if needed)
const syncUser = async (req, res) => {
    const { firebaseUid, email, name } = req.body;

    if (!firebaseUid || !email) {
        return res.status(400).json({ message: 'Firebase UID and email are required' });
    }

    try {
        let user = await User.findOne({ firebaseUid });

        if (user) {
            // Update existing user
            user.email = email;
            if (name) user.name = name;
            await user.save();
            return res.status(200).json(user);
        } else {
            // Create new user
            user = await User.create({
                firebaseUid,
                email,
                name
            });
            return res.status(201).json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Log user activity
// @route   POST /api/users/activity
// @access  Public
const logActivity = async (req, res) => {
    const { firebaseUid, action, toolSlug, metadata } = req.body;

    if (!firebaseUid || !action) {
        return res.status(400).json({ message: 'User UID and action are required' });
    }

    try {
        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.activityLog.push({
            action,
            toolSlug,
            metadata
        });

        await user.save();

        res.status(200).json({ message: 'Activity logged' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user profile with activity
// @route   GET /api/users/:uid
// @access  Public
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    syncUser,
    logActivity,
    getUserProfile
};
