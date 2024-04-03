// CabService.js

class CabService {
    constructor() {
      // Initialize with some sample data
      this.cabs = [
        { id: 1, type: "Economy", price: 10, available: true },
        { id: 2, type: "Sedan", price: 15, available: true },
        { id: 3, type: "SUV", price: 20, available: false }, // Assuming this SUV is not available
        // Add more cabs as needed
      ];
    }
  
    // Function to get available cabs
    getAvailableCabs() {
      return this.cabs.filter(cab => cab.available);
    }
  }
  
  module.exports = CabService;
  