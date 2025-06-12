const mongoose = require('mongoose');

const ProjectAssignSchema = new mongoose.Schema({
    suprvisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    intern: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intern'
    }],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    status: {
        type: String,
        enum: ['ongoing', 'completed', 'on-hold', 'cancelled'],
        default: 'ongoing'
    },
}, { timestamps: true });

const ProjectAssign = mongoose.model('ProjectAssign', ProjectAssignSchema);

module.exports = ProjectAssign;