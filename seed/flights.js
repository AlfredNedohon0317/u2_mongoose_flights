const db = require('../db/index.js')
const Airport = require('../models/airport.js')
const Flight = require('../models/flight.js')
db.on('error', console.error.bind(console, "MongoDB connection error"))


const main = async()=>{
    const LosAngelesInternationalAirport = await Airport.find({ name: 'Los Angeles International Airport'})
    const JohnFKennedyInternationalAirport= await Airport.find({ name: 'John F. Kennedy International Airport'})
    const SanFranciscoInternationalAirport= await Airport.find({ name: 'San Francisco International Airport'})
    const LaGuardiaAirport = await Airport.find({ name: 'LaGuardia Airport'})

const flights = [
    { airline: 'Delta', flightNumber: 123, price: 300, numberOfSeats: 150, departingAirport: LosAngelesInternationalAirport[0]._id, arrivalAirport: JohnFKennedyInternationalAirport[0]._id,departureDateTime: new Date('2024-06-01T10:00:00Z') },
    { airline: 'united', flightNumber: 456, price: 250, numberOfSeats: 200, departingAirport: SanFranciscoInternationalAirport[0]._id, arrivalAirport: JohnFKennedyInternationalAirport[0]._id,departureDateTime: new Date('2024-06-01T10:00:00Z') },
    { airline: 'southwest', flightNumber: 786, price: 150, numberOfSeats: 100, departingAirport: LaGuardiaAirport[0]._id, arrivalAirport: JohnFKennedyInternationalAirport[0]._id,departureDateTime: new Date('2024-06-01T10:00:00Z') },
    { airline: 'american', flightNumber: 321, price: 350, numberOfSeats: 180, departingAirport: LaGuardiaAirport[0]._id, arrivalAirport: SanFranciscoInternationalAirport[0]._id,departureDateTime: new Date('2024-06-01T10:00:00Z') },
    { airline: 'jetBlue', flightNumber: 654, price: 200, numberOfSeats: 160, departingAirport: JohnFKennedyInternationalAirport[0]._id, arrivalAirport: SanFranciscoInternationalAirport[0]._id,departureDateTime: new Date('2024-06-01T10:00:00Z') },
    { airline: 'alaska', flightNumber: 987, price: 400, numberOfSeats: 120, departingAirport: LosAngelesInternationalAirport[0]._id, arrivalAirport: SanFranciscoInternationalAirport[0]._id,departureDateTime: new Date('2024-06-01T10:00:00Z') },
    { airline: 'spirit', flightNumber: 741, price: 100, numberOfSeats: 200, departingAirport: JohnFKennedyInternationalAirport[0]._id, arrivalAirport: SanFranciscoInternationalAirport[0]._id,departureDateTime: new Date('2024-06-01T10:00:00Z') },

]

await Flight.insertMany(flights)
console.log ('created flights with airports')

}

const run = async () => {
    await main()
        db.close()}
run ()

