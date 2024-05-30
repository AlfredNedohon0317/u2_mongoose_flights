const mongoose = require('mongoose')

mongoose
.connect('mongodb://127.0.0.1:27017/flightsDatabase')
.then(()=>console.log('connected to mongodb!'))
.catch((error)=> console.error('Error!', error.message))

mongoose.set('debug', true)

const db = mongoose.connection

module.exports = db