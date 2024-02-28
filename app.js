const express = require('express'); // web framework
const receiptsRoutes = require('./routes/receiptsRoutes'); // import routes for receipts

const app = express();

const PORT = process.env.PORT || 3000; // Port number for the Express server

// listen for requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// routes
app.get("/", (req, res) => {
    res.send("API is running");
});

// receipts routes
app.use('/receipts', receiptsRoutes); // use the routes for receipts

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404 Not Found' });
})
