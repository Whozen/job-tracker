const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSourcesSchema = new Schema({
    name: {type: String, required: true},
    rating: {type: String},
    root_domain: {type: String},
    logo_file: {type: String},
    description: {type: String}
}, {
    timestamps: true
});

const JobSources = mongoose.model('JobSources', jobSourcesSchema);

module.exports = JobSources;