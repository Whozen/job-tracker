const Opprty = require("../models/job-opportunities.model");
const Sources = require("../models/job-sources.model");
const mongoose = require("mongoose");
const jobBoards = require("../data/jobBoards.json");
const csvtojson = require("csvtojson");

require('dotenv').config();

const jobOppry = [];
const jobSources = [];
const sourcesList = jobBoards["job_boards"];

const jobMap = [];
const jobCount = new Map()
jobCount.set('Company Website', 0);
jobCount.set('Unknown', 0);

loadSourceJSON();

async function loadSourceJSON() {
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
    .fromFile("../data/job_opportunities.csv")
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
                    //createCSV();
                    mongoose.disconnect();
                    console.log("Database disconnected.");
                    console.log(jobCount);
                }
            }
        });
    });
}


// function createCSV() {
//     const json2csv = require('json2csv').parse;

//     const filePath = path.join(__dirname, "../../../", "public", "exports", "resolved-jobs.csv");

//     let csv; 

//     const student = await req.db.collection('Student').find({}).toArray();

//     // Logging student
//     // [{id:1,name:"John",country:"USA"},{id:1,name:"Ronny",country:"Germany"}]

//     const fields = ['id','Job Title','Company Name', 'Job URL', 'Job Source'];

//     try {
//         csv = json2csv(resolved_jobs, {fields});
//     } catch (err) {
//         return res.status(500).json({err});
//     }

//     fs.writeFile(filePath, csv, function (err) {
//         if (err) {
//             return res.json(err).status(500);
//         }
//         else {
//             setTimeout(function () {
//                 fs.unlink(filePath, function (err) { // delete this file after 30 seconds
//                 if (err) {
//                     console.error(err);
//                 }
//                 console.log('File has been Deleted');
//             });

//         }, 30000);
//             res.download(filePath);
//         }
//     })

// }