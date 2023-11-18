// app/controllers/logController.js
const Log = require('../models/logModel');

class LogController {
    async ingestLog(logData) {
        try {
            const newLog = new Log(logData);
            await newLog.save();
            return { success: true, message: 'Log ingested successfully' };
        } catch (error) {
            return { success: false, message: 'Error ingesting log', error: error.message };
        }
    }
}

module.exports = new LogController();
