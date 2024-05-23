const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: String,
    flightNumber: Number,
    price: Number,
    numberOfSeats: Number,
    departingAirport: { type: Schema.Types.ObjectId, ref: 'Airport' },
    arrivalAirport: { type: Schema.Types.ObjectId, ref: 'Airport' },
    departureDateTime: Date,
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
