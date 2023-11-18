const mongoose = require('mongoose');

const dbName = 'log-ingestor';

mongoose.connect(`mongodb://localhost:27017/${dbName}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`Connected to MongoDB database: ${dbName}`);
});

module.exports = db;
