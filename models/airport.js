const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airportSchema = new Schema({
    name: String,
    location: String,
    code: String,
});

const Airport = mongoose.model('Airport', airportSchema);

module.exports = Airport;
