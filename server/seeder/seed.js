const Opprty = require("../models/job-opportunities.model");
const Sources = require("../models/job-sources.model");
const mongoose = require("mongoose");
const jobBoards = require("../jobBoards.json");
const csvtojson = require("csvtojson");

require('dotenv').config();

const jobOppry = [];
const jobSources = [];
const sourcesList = jobBoards["job_boards"];

const jobMap = [];

loadSourceJSON();

async function loadSourceJSON() {
    let i = 0;

    for(let x in sourcesList) {
        jobMap.push({name: sourcesList[x]['name'], url: sourcesList[x]['root_domain']});
        jobSources[i++] = new Sources({
            name: sourcesList[x]['name'],
            rating: sourcesList[x]['rating'],
            root_domain: sourcesList[x]['root_domain'],
            logo_file: sourcesList[x]['logo_file'],
            description: sourcesList[x]['description']
        });
    }
}

function findSource(name, url) {
    if(url === "") {
        return "Unknown";
    }
    for(let x in jobMap) {
        if(url.includes(jobMap[x].url)) {
           return jobMap[x].name;
        }
    }
    
    if(url.includes(name.toLowerCase())) {
        return "Company Website";
    } else {
        return "Unknown";
    }
}

function loadOpprJSON(csvData) {
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
    }
}

//connect mongoose
const uri = "mongodb+srv://admin123:admin123@cluster0.unsuc.mongodb.net/tracker?retryWrites=true&w=majority";
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected.');
    runSeed();
});

async function runSeed() {
    console.log("Seeding started...");
    await jobSourceSeed();
}

async function jobSourceSeed() {
    jobSources.map(async (js, index) => {
        await js.save((err, result) => {
            if (err){
                console.log(err);
            }
            else{
                if (index === jobSources.length - 1) {
                    readCSV();
                }
            }
        });
    });
}

function readCSV() {
    csvtojson()
    .fromFile("../job_opportunities.csv")
    .then(csvData => {
        loadOpprJSON(csvData);
        jobOpprSeed();
    });
}

function jobOpprSeed() {
    jobOppry.map(async (js, index) => {
        await js.save((err, result) => {
            if (err){
                console.log(err);
            }
            else{
                if (index === jobOppry.length - 1) {
                    console.log("Seeding Complete!");
                    mongoose.disconnect();
                    console.log("Database disconnected.");
                }
            }
        });
    });
}