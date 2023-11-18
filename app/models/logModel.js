const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    resourceId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    traceId: String,
    spanId: String,
    commit: String,
    metadata: {
        parentResourceId: String,
    },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
