const express = require("express");
const { CalculateDistance } = require("./services/CalculateDistance");
const BookingService = require("./services/BookingService");
const CabService = require("./services/CabService");
const cors = require("cors");
const app = express();
const bookingservice = new BookingService();
const cabService = new CabService();


app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Get source and destinations
app.get("/locations", (req, res) => {
  res.json([
    { value: "Delhi", label: "Delhi" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Hyderabad", label: "Hyderabad" },
  ]);
});

// Book a cab
app.get("/bookcab", (req, res) => {
  // Call the bookCab function from the BookingService
  bookingservice.bookCab(req, res);

});

// Get booking details
app.get("/booking", (req, res) => {
  bookingservice.getBooking(req, res);
});

// Calculate distance
app.get("/options", CalculateDistance);

// Get available cabs
app.get("/cabs", (req, res) => {
  // Call the getAvailableCabs function from the CabService to fetch available cabs
  const availableCabs = cabService.getAvailableCabs();

  // Send the list of available cabs as a JSON response
  res.json(availableCabs);
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
