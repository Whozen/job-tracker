const Opprty = require("../models/job-opportunities.model");
const mongoose = require("mongoose");
const csvtojson = require("csvtojson");

require('dotenv').config();

let JobSources = require('../models/job-sources.model');

const jobOppry = [];

csvtojson()
  .fromFile("../job_opportunities.csv")
  .then(csvData => {
    resolveJobs();
    loadJSON(csvData);
});

async function resolveJobs() {
    var sources = await getSources();

    console.log(sources);
    for(let x in sources) {
        jobMap.set(sources[x].name, sources[x].root_domain)
    }

    console.log(jobMap);

    // console.log(sources);
    // for(let x in oppr) {
    //     for(let y in sources) {
    //         console.log(oppr[x].jobURL);
    //         if(oppr[x].jobURL.includes(sources[y].name.toLowerCase())) {
    //             oppr[x].jobSource = sources[y].name;
    //             break;
    //         }
    //     }
    // }
}

var jobMap = new Map();

async function getSources() {
    await JobSources.find((err, result) => {
        if(!err) {
            return result;
        } else {
            console.log(err);
        }
    }).clone();

    // JobSources.find()
    // .then(jobSources => res.json(jobSources))
    // .catch(err => console.log('Error: ' + err));
}

function findSource(name, url) {
    if(url.includes(name.toLowerCase())) {
        return "Company Website";
    } else {
        return "Unknown"
    }
}

function loadJSON(csvData) {
    let i = 0;

    for(let x in csvData) {
        jobOppry[i++] = new Opprty({
            id: csvData[x]['ID (primary key)'],
            jobTitle: (csvData[x]['Job Title'] != undefined ? csvData[x]['Job Title'] : ''),
            companyName: (csvData[x]['Company Name'] != undefined ? csvData[x]['Company Name'] : ''),
            jobURL: (csvData[x]['Job URL'] != undefined ? csvData[x]['Job URL'] : ''),
            jobSource: findSource(csvData[x]['Company Name'], csvData[x]['Job URL'])
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