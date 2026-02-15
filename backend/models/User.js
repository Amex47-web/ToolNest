const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    toolSlug: {
        type: String,
        required: false
    },
    metadata: {
        type: Object,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    activityLog: [ActivitySchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
