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


InternSchema.pre('save', function (next) {
    if (this.InternshipEndAt) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const endDate = new Date(this.InternshipEndAt);
        endDate.setHours(0, 0, 0, 0);

        if (endDate <= today) {
            this.isOneIntern = false;
        }
    }
    next();
});

const Intern = mongoose.model('Intern', InternSchema);

module.exports = Intern;
