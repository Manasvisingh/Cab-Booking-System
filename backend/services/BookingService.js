const { v4: uuidv4 } = require('uuid');


class BookingService {
    constructor() {
        this.bookingsMap = new Map(); // Initialize a new Map to store bookings
    }

     bookCab(req,res) {
        try {
            const {email, source, destination} = req.query
            // Perform any necessary validation checks

            // Example: Check if the source and destination are valid locations

            // Perform business logic
            // Example: Create a new booking object
            const newBooking = {
                email: email,
                source: source,
                destination: destination,
                status: 'pending', // Assuming the initial status of the booking is 'pending'
                date: new Date() // Assuming the current date and time is used for the booking
            };

            // Generate a unique booking ID (optional)
            const bookingId = uuidv4(); // You can implement the generateUniqueId function

            // Save the new booking object to the Map with the booking ID as key
            this.bookingsMap.set(bookingId, newBooking);
            console.log(this.bookingsMap)

            // Return the booking result
            res.json({ success: true, message: 'Cab booked successfully!', bookingId: bookingId });
        } catch (error) {
            // Handle any errors    
            console.error('Error occurred while booking a cab:', error);
            throw new Error('Failed to book a cab.');
        }
    }
    getBooking(req,res){
        console.log("get")
        const {bookingId} = req.query;
        const booking = this.bookingsMap.get(bookingId)
        console.log(this.bookingsMap)
        res.json({ email: booking.email, source: booking.source, destination: booking.destination, status: booking.status, date: booking.date });
    }
    
}

module.exports = BookingService