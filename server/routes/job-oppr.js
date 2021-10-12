const router = require('express').Router();
let JobOppr = require('../models/job-opportunities.model');
let JobSources = require('../models/job-sources.model');

router.route('/').get((req, res) => {
  JobOppr.find()
  .then(jobopprties => res.json(jobopprties))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(async(req, res) =>  {
  let sourceName = "";

  await JobSources.findById(req.params.id)
  .then(jobsource => sourceName = jobsource.name)
  .catch(err => res.status(400).json('Errors: ' + err));

  JobOppr.find({jobSource: sourceName}, function (err, response) {
    if (err){
      console.log(err);
    } else{
      res.json(response);
    }
  });
});

module.exports = router;