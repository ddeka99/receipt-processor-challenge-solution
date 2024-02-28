const express = require('express');
const receiptsControllers = require('../controllers/receiptsControllers');
const router = express.Router();

router.post('/process', receiptsControllers.processReceipts);
router.get('/:id/points', receiptsControllers.getReceiptPoints);

export default router;