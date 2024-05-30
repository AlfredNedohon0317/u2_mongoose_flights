const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {type:String, required:true},
    flightNumber: {type:Number,required:true },
    price: {type:Number,required:true },
    numberOfSeats: {type:Number,required:true },
    departingAirport: { type:Schema.Types.ObjectId, ref: 'Airport' },
    arrivalAirport: { type: Schema.Types.ObjectId, ref: 'Airport' },
    departureDateTime: {type:Date,required:true}
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
