const mongoose = require('mongoose');

const GitOrgnizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gitURL: {
        type: String,
        required: true
    },
    
});

const GitOrgnization = mongoose.model('GitOrgnization', GitOrgnizationSchema);

module.exports = GitOrgnization;