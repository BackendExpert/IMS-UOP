const mongoose = require('mongoose');

const InternSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    joinAt: {
        type: Date,
        default: new Date(),
        required: true
    },

    InternshipEndAt: {
        type: Date,
    },

    address: { type: String, required: true },
    cv: { type: String, required: true },
    dob: { type: Date, required: true },
    github: { type: String, required: true, unique: true },
    linkedin: { type: String, required: true, unique: true },
    camups: { type: String, required: true },
    course: { type: String, required: true },
    isApprove: { type: Boolean, required: true, default: false },
    isOneIntern: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const Intern = mongoose.model('Intern', InternSchema);

module.exports = Intern;