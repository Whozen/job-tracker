# Job Tracker #

# Working of the program

The project must first be initialized by loading the data from the CSV and JSON files into the database. In addition, the job opportunities needs to be resolved before loading it to the database. These are done by seed.js file in the path job-tracker -> server -> seeder by running the command `node seed`.
After initilization, we will see all the job sources listed in a three column block in the home page. On clicking a specific job souce, it will redirect to another page where all the job opportunities are listed that are available in the respective job source.

The front-end is implemented using React.js and back-end is implemented using Node.js, with MongoDB atlas being used as the database to store all the data. The usage of MERN stack approach makes the project scalable and adaptive. Furthermore, the usage of API to communicate between client and server, and the database makes it more secure and flexible.

### File paths ###

Server side             = job-tracker -> server <br />
Main file               = job-tracker -> server -> server.js <br />
Job resolution          = job-tracker -> server -> seeder -> seed.js <br />
CSV and JSON files      = job-tracker -> server -> data <br />

Client side             = job-tracker -> client <br />
Main entry point        = job-tracker -> client -> public -> index.html <br />
JavaScript entry point  = job-tracker -> client -> src -> index.js <br />


# Initlizing the project

To import all the libraries for front and back end:

Go to the respective folders (job-tracker -> client) / (job-tracker -> server) <br />
`cd client` / `cd server`

Run the following command to create node modules from package.json <br />
`npm i`

Create environment variable for both client and server side.
Please refer to the `.env.sample` file inside root folder of both client (job-tracker/client) and server (job-tracker/server) to create your own `.env` file.

# Importing data to the database and resolving the job source for job opportunities

Go to the seeder folder directory inside the server folder (job-tracker -> server -> seeder -> seed.js): <br />
`cd server` <br />
Then: <br />
`cd seeder`

Run the seed.js file to start importing and resolving: <br />
`node seed`

This will open the connection with MongoDB atlas database, and then start importing the data. First, job sources are imported into the database by extracting data from the jobBoards.json file (server -> data -> jobBoards.json). Then using the job sources available, it resolves each job opportunities listed in the job_opportunities.csv file (server -> data -> job_opportunities.csv). The code checks the URL of the job opportunity for any substring that consists of job source URL. If it does, then the job sources set as the source of the job opportunity. Otherwise, the code looks for the company name in the job opportunity URL, and sets the job source as Company Name for the job opportunity. Lastly, if neither of them matches or if there is no URL for the job opportunity, then the source is set as Unknown.


# Starting the backend server

Go to the server folder directory from root folder (job-tracker -> server): <br />
`cd server`

Then start the server by entering the command below: <br />
`npm start`


# Starting the frontend react app

Go to the client folder directory from root folder (job-tracker -> client): <br />
`cd client`

Then run the application by entering the command below: <br />
`npm start`


# Third party libraries and packages used in the project

## Client Side ##

1) React = This JavaScript library is used to develop front-end user interfaces. It is used for handling the view layer for web. <br />
2) Axios = It is used to make HTTP requests from node.js (server) in this project. <br />
3) Bootstrap = It is used for CSS styling to the HTML elements. <br />
4) React Router DOM = It enables us to implement dynamic routing in a web app. It facilitates component-based routing according to the needs of the project. <br />

## Server Side ##

1) Node.js = This framework is used for backend server-side programming in this project. It is used for API services. <br />
2) Express = It is used to set up middlewares to respond to HTTP Requests and define routing table which is used to perform different actions based on HTTP Method and URL. <br />
3) Mongoose = This is Object Data Modeling (ODM) library for MongoDB. Since the database for the project is MongoDB atlas, we used this library. It manages relationships between data, and is used to translate between objects in code and the representation of those objects in MongoDB. <br />
4) Dotenv = It is used to automatically load environment variables from the .env file into the process. <br />
5) Cors = It is used to allow or restrict requested resources on a web server depend on where the HTTP request was initiated. <br />
6) CSVTOJSON = This module is used to convert the job opportunity data in CSV file to JSON format in order to resolve and load it into the database. <br />
7) json2csv = This package is used to convert json data into csv format in order to create a csv file. <br />


# Web App Link

https://source-job-tracker.netlify.app/

# CSV file for resolved job opportunities

https://drive.google.com/file/d/11hCffkKK8fk-beqeAxOmPrUGoxdrf-aa/view?usp=sharing <br />
The CSV file for the resolved jobs is generated during the seeding process, after all the resolution and seeding process has finished. The CSV file is saved in the path job-tracker -> server -> data -> resolved-jobs.csv.


# Total count of job opportunities associated with each job source.

https://ibb.co/M7RhLxs <br />
The above data can be reproduced by running the seed.js file in the server folder using `node seed` command from the path job-tracker -> server -> seeder -> seed.js. The output will be displayed as shown in the image, in the console where the command was executed. <br />
However, note that the seed.js file will resolve the job opportunities and load data to database as well.