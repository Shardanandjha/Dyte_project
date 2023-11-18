const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

router.post('/', async (req, res) => {
    const logData = req.body;
    const result = await logController.ingestLog(logData);
    
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(500).json({ message: result.message, error: result.error });
    }
});

module.exports = router;
