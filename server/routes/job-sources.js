const router = require('express').Router();
let JobSources = require('../models/job-sources.model');

router.route('/').get((req, res) => {
  JobSources.find()
  .then(jobSources => res.json(jobSources))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  JobSources.findById(req.params.id)
  .then(jobSources => res.json(jobSources.name))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;