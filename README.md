# Job Tracker

# Working of the program



# Initlizing the project

To import all the libraries for front and back end:

Go to the respective folders (job-tracker -> client) / (job-tracker -> server)
`cd client` / `cd server`

Run the following command to create node modules from package.json
`npm i`


# Importing data to the database and resolving the job source for job opportunities

Go to the seeder folder directory inside the server folder (job-tracker -> server -> seeder -> seed.js):
`cd server`
Then:
`cd seeder`

Run the seed.js file to start importing and resolving:
`node seed`

This will open the connection with MongoDB atlas database, and then start importing the data. First, job sources are imported into the database by extracting data from the jobBoards.json file (server -> data -> jobBoards.json). Then using the job sources available, it resolves each job opportunities listed in the job_opportunities.csv file (server -> data -> job_opportunities.csv). The code checks the URL of the job opportunity for any substring that consists of job source URL. If it does, then the job sources set as the source of the job opportunity. Otherwise, the code looks for the company name in the job opportunity URL, and sets the job source as Company Name for the job opportunity. Lastly, if neither of them matches or if there is no URL for the job opportunity, then the source is set as Unknown.


# Starting the backend server

Go to the server folder directory from root folder (job-tracker -> server):
`cd server`

Then start the server by entering the command below:
`node server`


# Starting the frontend react app

Go to the client folder directory from root folder (job-tracker -> client):
`cd client`

Then run the application by entering the command below:
`npm start`


# Third party libraries and packages used in the project

# Client Side

1) React = This JavaScript library is used to develop front-end user interfaces. It is used for handling the view layer for web.
2) Axios = It is used to make HTTP requests from node.js (server) in this project.
3) Bootstrap = It is used for CSS styling to the HTML elements.
4) React Router DOM = It enables us to implement dynamic routing in a web app. It facilitates component-based routing according to the needs of the project.

# Server Side

1) Node.js = This framework is used for backend server-side programming in this project. It is used for API services.
2) Express = It is used to set up middlewares to respond to HTTP Requests and define routing table which is used to perform different actions based on HTTP Method and URL.
3) Mongoose = This is Object Data Modeling (ODM) library for MongoDB. Since the database for the project is MongoDB atlas, we used this library. It manages relationships between data, and is used to translate between objects in code and the representation of those objects in MongoDB.
4) Dotenv = It is used to automatically load environment variables from the .env file into the process.
5) Cors = It is used to allow or restrict requested resources on a web server depend on where the HTTP request was initiated.
6) CSVTOJSON = This module is used to convert the job opportunity data in CSV file to JSON format in order to resolve and load it into the database.


# Web App Link


# CSV file for resolved job opportunities


# A table or some other minimal visual representation showing the job source and the total count of job opportunities associated with that job source. Here’s a partial example. 
