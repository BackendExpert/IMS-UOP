const mongoose = require('mongoose');

const OrgSystemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gitURL: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    }
}, { timestamps: true });

const OrgSystem = mongoose.model('OrgSystems', OrgSystemSchema);

module.exports = OrgSystem;