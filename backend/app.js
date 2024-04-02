const express = require('express');
const { CalculateDistance } = require('./services/CalculateDistance');
const BookingService = require('./services/BookingService');
const app = express();
const bookingservice = new BookingService()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/bookingpost', (req, res) => {
    bookingservice.bookCab(req, res)
});

app.get('/booking', (req, res) => {
    bookingservice.getBooking(req, res)
});
app.get('/calculate',CalculateDistance);

app.get('/cabs', (req, res) => {
    res.json({ message: 'Hello, world!' });
});
app.post('/cabs', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

