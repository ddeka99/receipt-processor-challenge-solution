const { v4: uuidv4 } = require('uuid');
const receipts = {};

const processReceipts = (req, res) => {
    const receipt = req.body;
    const id = uuidv4(); // Generate a unique ID for the receipt
    const points = calculatePoints(receipt); // Function to calculate points
    receipts[id] = points; // Store the points with the id as the key
    res.json({ id }); // Respond with the generated ID
}

const getReceiptPoints = (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    const points = receipts[id]; // Get the points for the ID
    if (points !== undefined) { // Receipt exists
        res.json({ points });
    }
    else { // Receipt doesn't exist
        res.status(404).send('Receipt not found');
    }
}

const calculatePoints = (receiptData) => {
    // Extract data from the receiptData object
    const { retailer, total, purchaseDate, purchaseTime, items } = receiptData;

    // Initialize points to zero
    let points = 0;

    // Rule 1: One point for every alphanumeric character in the retailer name
    points += (retailer.match(/[a-zA-Z0-9]/g) || []).length;
    
    const totalFloat = parseFloat(total);
    // Rule 2: 50 points if the total is a round dollar amount with no cents
    if (totalFloat % 1 === 0) {
        points += 50;
    }

    // Rule 3: 25 points if the total is a multiple of 0.25
    if (totalFloat % 0.25 === 0) {
        points += 25;
    }

    // Rule 4: 5 points for every two items on the receipt
    points += Math.floor(items.length / 2) * 5;

    // Rule 5: If the trimmed length of the item description is a multiple of 3,
    // multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
    items.forEach((item) => {
        const trimmedDescriptionLength = item.shortDescription.trim().length;
        if (trimmedDescriptionLength % 3 === 0) {
            const priceFloat = parseFloat(item.price);
            points += Math.ceil(priceFloat * 0.2);
        }
    });

    // Rule 6: 6 points if the day in the purchase date is odd
    const purchaseDateParts = purchaseDate.split('-');
    const day = parseInt(purchaseDateParts[2], 10);
    if (day % 2 !== 0) {
        points += 6;
    }

    // Rule 7: 10 points if the time of purchase is after 2:00pm and before 4:00pm
    const purchaseTimeParts = purchaseTime.split(':');
    const hour = parseInt(purchaseTimeParts[0], 10);
    const minute = parseInt(purchaseTimeParts[1], 10);
    if (hour === 14 && minute >= 0 && hour < 16) {
        points += 10;
    }


    return points;
}

module.exports = {
    processReceipts,
    getReceiptPoints
}