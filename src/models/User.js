const mongoose = require('../database');

const userSchema = new mongoose.Schema({
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
    },

    experience: {
        type: Number,
        default: 0
    },

    strength: {
        type: Number,
        default: 1
    },

    dexterity: {
        type: Number,
        default: 1
    },
    
    constitution: {
        type: Number,
        default: 1
    },

    intelligence: {
        type: Number,
        default: 1
    },

    charism: {
        type: Number,
        default: 1
    },

    gold: {
        type: Number,
        default: 10
    },

    points: {
        type: Number,
        default: 1
    },

    hitpoints: {
        type: Number,
        default: 100
    },

    manapoints: {
        type: Number,
        default: 52
    },

    energy: {
        type: Number,
        default: 13
    },
});

userSchema.virtual('toNextLevel').get(function() {
    return this.level * 100;
});

userSchema.virtual('maxHitpoints').get(function() {
    return this.level * 100;
});

userSchema.virtual('maxManapoints').get(function() {
    return this.level * 50 + this.intelligence * 2;
});

userSchema.virtual('maxEnergy').get(function() {
    return this.level * 10 + this.constitution * 3;
});

userSchema.virtual('damage').get(function() {
    // if the user doesn't have a weapon
    if (true) return this.level * this.strength * Math.floor(Math.random() * 2);

});


module.exports = mongoose.model('User', userSchema)