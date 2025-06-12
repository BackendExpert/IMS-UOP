const mongoose = require('mongoose');

const LetterSchema = new mongoose.Schema({
    intern: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    project: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
    duration: {
        type: Number,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    startData: {
        type: Date,
        required: true,
    },
    endData: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

const Letter = mongoose.model('Letter', LetterSchema);

module.exports = Letter;