const Log = require('../models/logModel');
const fs = require('fs');

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

    async search(options){
        console.log(options);
        const projection = {
            _id: 0,
            __v: 0,  
        };

        const result = await Log.find(options.query).select(projection).limit(options.limit);
        if(result.length == 0){
            console.log("No result found");
        }else{
            console.log(result);
        }
    }
}

module.exports = new LogController();
