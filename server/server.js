'use strict';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('express').Router();
require('dotenv').config();

const app = express();
const serverless = require('serverless-http');
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected.');
});

app.use(cors());
app.use(express.json());

const jobSourceRouter = require('./routes/job-sources.js');
const jobOpprRouter = require('./routes/job-oppr.js');

// app.use('/jobsources', jobSourceRouter);
// app.use('/jobopprties', jobOpprRouter);
app.use('/.netlify/functions/server/jobsources', jobSourceRouter);
app.use('/.netlify/functions/server/jobopprties', jobOpprRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = router;
module.exports = app;
module.exports.handler = serverless(app); 