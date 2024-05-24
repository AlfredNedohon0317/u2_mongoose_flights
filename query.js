const mongoose = require('mongoose');
const db = require('./db/index');
const Airport = require('./models/airport');
const Flight = require('./models/flight');

// Sample data for seeding the database
const airports = [
    { name: 'Los Angeles International Airport', location: 'Los Angeles, CA', code: 'LAX' },
    { name: 'John F. Kennedy International Airport', location: 'New York, NY', code: 'JFK' },
    { name: 'San Francisco International Airport', location: 'San Francisco, CA', code: 'SFO' },
    { name: 'LaGuardia Airport', location: 'New York, NY', code: 'LGA' }
];

const flights = [
    { airline: 'Delta', flightNumber: 123, price: 300, numberOfSeats: 150, departureDateTime: new Date('2024-06-01T10:00:00Z') },
    { airline: 'United', flightNumber: 456, price: 250, numberOfSeats: 200, departureDateTime: new Date('2024-07-01T12:00:00Z') },
    { airline: 'Southwest', flightNumber: 789, price: 150, numberOfSeats: 100, departureDateTime: new Date('2024-08-01T14:00:00Z') },
    { airline: 'American', flightNumber: 321, price: 350, numberOfSeats: 180, departureDateTime: new Date('2024-09-01T16:00:00Z') },
    { airline: 'JetBlue', flightNumber: 654, price: 200, numberOfSeats: 160, departureDateTime: new Date('2024-10-01T18:00:00Z') },
    { airline: 'Alaska', flightNumber: 987, price: 400, numberOfSeats: 120, departureDateTime: new Date('2024-11-01T20:00:00Z') },
    { airline: 'Spirit', flightNumber: 741, price: 100, numberOfSeats: 180, departureDateTime: new Date('2024-12-01T22:00:00Z') },
];

// database seed
async function seedDatabase() {
    await Airport.deleteMany({});
    await Flight.deleteMany({});

    const createdAirports = await Airport.insertMany(airports);
    console.log('Airports seeded:', createdAirports);

    flights[0].departingAirport = createdAirports[0]._id;
    flights[0].arrivalAirport = createdAirports[1]._id;
    flights[1].departingAirport = createdAirports[2]._id;
    flights[1].arrivalAirport = createdAirports[3]._id;
    flights[2].departingAirport = createdAirports[0]._id;
    flights[2].arrivalAirport = createdAirports[3]._id;
    flights[3].departingAirport = createdAirports[1]._id;
    flights[3].arrivalAirport = createdAirports[2]._id;
    flights[4].departingAirport = createdAirports[0]._id;
    flights[4].arrivalAirport = createdAirports[3]._id;
    flights[5].departingAirport = createdAirports[2]._id;
    flights[5].arrivalAirport = createdAirports[1]._id;
    flights[6].departingAirport = createdAirports[3]._id;
    flights[6].arrivalAirport = createdAirports[0]._id;

    const createdFlights = await Flight.insertMany(flights);
    console.log('Flights seeded:', createdFlights);

    mongoose.connection.close();
}

// all airports and flights
async function listAll() {
    const airports = await Airport.find({});
    const flights = await Flight.find({}).populate('departingAirport').populate('arrivalAirport');
    console.log('Airports:', airports);
    console.log('Flights:', flights);
}

// Find by ID
async function findById(model, id) {
    const result = await model.findById(id).populate('departingAirport').populate('arrivalAirport');
    console.log('Result:', result);
}

// new airport
async function createAirport(name, location, code) {
    const airport = new Airport({ name, location, code });
    await airport.save();
    console.log('Created Airport:', airport);
}

// Create  new flight
async function createFlight(airline, flightNumber, price, numberOfSeats, departingAirport, arrivalAirport, departureDateTime) {
    const flight = new Flight({ airline, flightNumber, price, numberOfSeats, departingAirport, arrivalAirport, departureDateTime });
    await flight.save();
    console.log('Created Flight:', flight);
}

// Update  airport
async function updateAirport(id, updates) {
    const airport = await Airport.findByIdAndUpdate(id, updates, { new: true });
    console.log('Updated Airport:', airport);
}

// Update  flight
async function updateFlight(id, updates) {
    const flight = await Flight.findByIdAndUpdate(id, updates, { new: true }).populate('departingAirport').populate('arrivalAirport');
    console.log('Updated Flight:', flight);
}

// airport deleted 
async function deleteAirport(id) {
    await Airport.findByIdAndDelete(id);
    console.log('Deleted Airport:', id);
}

// Delete a flight
async function deleteFlight(id) {
    await Flight.findByIdAndDelete(id);
    console.log('Deleted Flight:', id);
}

// flights by departure date
async function listFlightsByDate() {
    const flights = await Flight.find({}).sort('departureDateTime').populate('departingAirport').populate('arrivalAirport');
    console.log('Flights by date:', flights);
}

//upcoming flights list
async function listUpcomingFlights() {
    const now = new Date();
    const flights = await Flight.find({ departureDateTime: { $gt: now } }).sort('departureDateTime').populate('departingAirport').populate('arrivalAirport');
    console.log('Upcoming Flights:', flights);
}

// flights list from California to New York by descending price
async function listCAtoNYFlights() {
    const flights = await Flight.find({
        departingAirport: { $in: await Airport.find({ location: /California/ }).select('_id') },
        arrivalAirport: { $in: await Airport.find({ location: /New York/ }).select('_id') }
    }).sort('-price').populate('departingAirport').populate('arrivalAirport');
    console.log('CA to NY Flights:', flights);
}



// seedDatabase();
// listAll();
// findById(Airport, 'airportId'); // Replace 'airportId' with a real ID
// findById(Flight, 'flightId'); // Replace 'flightId' with a real ID
// createAirport('Test Airport', 'Test Location', 'TST');
// createFlight('Test Airline', 999, 500, 100, 'departingAirportId', 'arrivalAirportId', new Date()); // Replace with real IDs
// updateAirport('airportId', { name: 'Updated Name' }); // Replace 'airportId' with a real ID
// updateFlight('flightId', { price: 600 }); // Replace 'flightId' with a real ID
// deleteAirport('airportId'); // Replace 'airportId' with a real ID
// deleteFlight('flightId'); // Replace 'flightId' with a real ID
// listFlightsByDate();
// listUpcomingFlights();
// listCAtoNYFlights();




//assited by chat gpt3.5