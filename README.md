# Log Ingestor and Query Interface

This project implements a Log Ingestor system and a Query Interface for efficiently handling and querying log data. The system is built using Node.js, Express, SQLite (Sequelize ORM), MongoDB (Mongoose ODM), and a Command-Line Interface (CLI) with Commander.

## Prerequisites

- Node.js and npm: Make sure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

- MongoDB: Ensure MongoDB is installed and running locally on port 27017. If not installed, download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community).

## Log Ingestor

### Setup

1. Clone repo to local machine
   ```bash
   git clone https://github.com/Shardanandjha/Dyte_project.git  
2. Install dependencies:
   ```bash
   npm install  
3. Run application:
   ```bash
   npm run start
## Log Query Interface CLI

### Setup

1. Clone repo to local machine
   ```bash
   git clone https://github.com/Shardanandjha/Dyte_project.git
2. Install dependencies:
   ```bash
   npm install
3. Run application:
   ```bash
   node query-cli.js search

## Usage

- CLI Commands
    - Search Logs:
       - Command: search
       - Description: Initiate with search for logs based on selected attributes.
       - Interactive prompts guide you through selecting attributes, entering search values, and applying filters.
    
    - Attributes Available for Search
       - level
       - message
       - resourceId
       - traceId
       - spanId
       - commit
       - metadata.parentResourceId

    - Filtering Options
        - Enter the value to search for.
        - Specify the number of logs to retrieve (press Enter for all logs).
        - Optionally filter logs by timestamp.

