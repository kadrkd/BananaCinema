const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

// module.exports = mongoose.model('Users', userSchema);
module.exports = mongoose.model("User", userSchema);