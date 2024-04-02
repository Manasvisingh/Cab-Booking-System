const express = require("express");
const { CalculateDistance } = require("./services/CalculateDistance");
const BookingService = require("./services/BookingService");
const cors = require("cors");
const app = express();
const bookingservice = new BookingService();

app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

//get Source and destinations
app.get("/locations", (req, res) => {
  res.json([
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ]);
});

app.get("/bookingpost", (req, res) => {
  bookingservice.bookCab(req, res);
});

app.get("/booking", (req, res) => {
  bookingservice.getBooking(req, res);
});
app.get("/options", CalculateDistance);

app.get("/cabs", (req, res) => {
  res.json({ message: "Hello, world!" });
});
app.post("/cabs", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
