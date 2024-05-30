const db = require('../db')
const {Airport} = require('../models/airport')
db.on('error', console.error.bind(console, "MongoDB connection error:"))

const main = async () => {
const airports = [
    { name: 'Los Angeles International Airport', location: 'Los Angeles, CA', code: 'LAX' },
    { name: 'John F. Kennedy International Airport', location: 'New York, NY', code: 'JFK' },
    { name: 'San Francisco International Airport', location: 'San Francisco, CA', code: 'SFO' },
    { name: 'LaGuardia Airport', location: 'New York, NY', code: 'LGA' }
];
await Airport.insertMany(airports)
console.log('Created airports!')
}



const run = async () => {
    await main()
    db.close()
}

run()