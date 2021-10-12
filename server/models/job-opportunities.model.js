const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobOpptySchema = new Schema({
    id: {type: Number, required: true},
    jobTitle: {type: String},
    companyName: {type: String },
    jobURL: {type: String },
    jobSource: {type: String }
}, {
    timestamps: true
});

const JobOpprty = mongoose.model('JobOpprty', jobOpptySchema);

module.exports = JobOpprty;