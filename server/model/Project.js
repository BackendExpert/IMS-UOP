const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true,
        unique: true
    },
    pdescription: {
        type: String,
        required: true,
        unique: true
    },
    giturl: {
        type: String,
        required: true,
        unique: true
    },
    pmembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    psupervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pstartdate: {
        type: Date,
        required: true,
        default: new Date()
    },
    estimatedEndDate: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;