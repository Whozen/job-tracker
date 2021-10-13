const Opprty = require("../models/job-opportunities.model");
const Sources = require("../models/job-sources.model");
const mongoose = require("mongoose");
const jobBoards = require("../data/jobBoards.json");
const csvtojson = require("csvtojson");
const json2csv = require('json2csv').parse;
var path = require('path');
const fs = require('fs');

require('dotenv').config({path:__dirname+'/../.env'});

const uri = process.env.ATLAS_URI;
const jobOppry = [];
const jobSources = [];
const sourcesList = jobBoards["job_boards"];
const jobMap = [];
const jobCount = new Map();

jobCount.set('Company Website', 0);
jobCount.set('Unknown', 0);

// Load Job Source data from jobSouce.json file into the job source model and arrays
loadSourcefromJSON();

// Open connection to MongoDB database
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected.');
    runSeed();
});

// Start seeding (importing) process
async function runSeed() {
    console.log("Seeding started...");
    await jobSourceSeed();
}

// Import the job source data into the MongoDB database.
// When all data has been imported, start processing job opportunities
async function jobSourceSeed() {
    jobSources.map(async (js, index) => {
        await js.save((err, result) => {
            if (err){
                console.log(err);
                return;
            }
            else{
                if (index === jobSources.length - 1) {
                    processOpprCSV();
                }
            }
        });
    });
}

async function loadSourcefromJSON() {
    let i = 0;

    for(let x in sourcesList) {
        jobMap.push({name: sourcesList[x]['name'], url: sourcesList[x]['root_domain']});
        jobCount.set(sourcesList[x]['name'], 0);
        jobSources[i++] = new Sources({
            name: sourcesList[x]['name'],
            rating: sourcesList[x]['rating'],
            root_domain: sourcesList[x]['root_domain'],
            logo_file: sourcesList[x]['logo_file'],
            description: sourcesList[x]['description']
        });
    }
}

// Find source of job opportunity with the help of the URL associated with it
function findSource(name, url) {
    if(url === "") {
        jobCount.set('Unknown', jobCount.get('Unknown') + 1);
        return "Unknown";
    }
    for(let x in jobMap) {
        if(url.includes(jobMap[x].url)) {
            jobCount.set(jobMap[x].name, jobCount.get(jobMap[x].name) + 1)
            return jobMap[x].name;
        }
    }
    
    if(url.includes(name.toLowerCase())) {
        jobCount.set('Company Website', jobCount.get('Company Website') + 1);
        return "Company Website";
    } else {
        jobCount.set('Unknown', jobCount.get('Unknown') + 1);
        return "Unknown";
    }
}

// Load JSON Job Opportunity data into the job opportunity model after resolving the data.
function loadOpprfromJSON(csvData) {
    let i = 0;
    let src;

    for(let x in csvData) {
        src = findSource(csvData[x]['Company Name'], csvData[x]['Job URL'])
        jobOppry[i++] = new Opprty({
            id: csvData[x]['ID (primary key)'],
            jobTitle: (csvData[x]['Job Title'] != undefined ? csvData[x]['Job Title'] : ''),
            companyName: (csvData[x]['Company Name'] != undefined ? csvData[x]['Company Name'] : ''),
            jobURL: (csvData[x]['Job URL'] != undefined ? csvData[x]['Job URL'] : ''),
            jobSource: src
        });
        csvData[x]['Job Source'] = src;
    }

    return csvData;
}

// Convert CSV data to JSON format and then import the data into database, and create CSV file for resolved jobs
function processOpprCSV() {
    let resJobs;
    csvtojson()
    .fromFile("../data/job_opportunities.csv")
    .then(csvData => {
        resJobs = loadOpprfromJSON(csvData);
        jobOpprSeed();
        createCSV(resJobs);
    });
}

// Import the job opportunity data into the MongoDB database.
// When all data has been imported, disconnect the database and display the total number of jo opportunity associated with each job source in the console.
function jobOpprSeed() {
    jobOppry.map(async (js, index) => {
        await js.save((err, result) => {
            if (err){
                console.log(err);
                return;
            }
            else{
                if (index === jobOppry.length - 1) {
                    console.log("Seeding Complete!");
                    mongoose.disconnect();
                    console.log("Database disconnected.");
                    console.log(jobCount);
                }
            }
        });
    });
}

// Create a CSV file from resolved jobs and save it in the path job-tracker/server/data/resolved-jobs.csv.
function createCSV(csvData) {
    let csv;
    const filePath = path.join(__dirname, "../", "data", "resolved-jobs.csv");
    const fields = ['ID (primary key)','Job Title','Company Name', 'Job URL', 'Job Source'];

    try {
        csv = json2csv(csvData, {fields});
    } catch (err) {
        console.log(err);
        return;
    }

    fs.open(filePath, 'w', function (err, file) {
        if (err) {
            console.log(err);
            return;
        }
    });
    
    fs.writeFile(filePath, csv, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    })
}