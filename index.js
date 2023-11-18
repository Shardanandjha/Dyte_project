const express = require('express');
const bodyParser = require('body-parser');
const logRoutes = require('./app/routes/logRoutes');
const databaseConfig = require('./config/database');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(logRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
