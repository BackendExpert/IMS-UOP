const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        enum: ['intern', 'supervisor', 'admin', 'director'],
        default: 'intern'
    },
    permissions: [{
        type: String,
        required: true
    }]
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);