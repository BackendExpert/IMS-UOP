const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    intern: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    attendanceDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    startAt: {
        type: String,
        required: true,
    },
    leaveAt: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
        enum: ['online', 'onsite'],
    },
    resons: {
        type: String,
    }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;