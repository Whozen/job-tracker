const Sources = require("../models/job-sources.model");
const mongoose = require("mongoose");
const jobBoards = require("../jobBoards.json");

require('dotenv').config();

const jobSources = [];
const sourcesList = jobBoards["job_boards"];

loadJSON();

function loadJSON() {
    let i = 0;

    for(let x in sourcesList) {
        jobSources[i++] = new Sources({
            name: sourcesList[x]['name'],
            rating: sourcesList[x]['rating'],
            root_domain: sourcesList[x]['root_domain'],
            logo_file: sourcesList[x]['logo_file'],
            description: sourcesList[x]['description']
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
    
    jobSources.map(async (js, index) => {
        await js.save((err, result) => {
            if (err){
                console.log(err);
            }
            else{
                if (index === jobSources.length - 1) {
                    console.log("Seeding Complete!");
                    mongoose.disconnect();
                    console.log("Database disconnected.");
                }
            }
        });
    });
}