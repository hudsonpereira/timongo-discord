const mongoose = require('../database');

module.exports = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },

    discord_id: {
        type: String,
        required: true
    },

    level: {
        type: Number,
        default: 1
    }
});