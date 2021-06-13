const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    score: String,
    description: {
        type: String,
        required: true
    },
    posted_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Films', filmSchema);