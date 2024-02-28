const { v4: uuidv4 } = require('uuid');
const receipts = {};

const processReceipts = (req, res) => {
    const receipt = req.body;
    const id = uuidv4(); // Generate a unique ID for the receipt
    const points = calculatePoints(receipt); // Function to calculate points (implementation needed)
    receipts[id] = points; // Store the points with the id as the key
    res.json({ id }); // Respond with the generated ID
}

const getReceiptPoints = (req, res) => {
    const { id } = req.params;
    const points = receipts[id];
    if (points !== undefined) {
        res.json({ points });
    }
    else {
        res.status(404).send('Receipt not found');
    }
}

// Function to calculate points based on the receipt
function calculatePoints(receipt) {
    // Implement the rules for calculating points here
    let points = 0;
    return points;
}

module.exports = {
    processReceipts,
    getReceiptPoints
}