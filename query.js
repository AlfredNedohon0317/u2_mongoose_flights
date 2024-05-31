const db = require('./db')
const Airport = require('./models/airport.js')
const Flight = require('./models/flight.js')


const findFlight = async () => {
    const flights = await Flight.find()
    console.log(flights)
}

const detailFlight = async () => {
    const flights = await Flight.findById('66590e7f033fa7649d3b08e3')
    console.log(flights)
}

const createFlight = async () => {
    const airport = await Airport.findById('6658ef9c9bd96e63ead137b0')
    const airport2 = await Airport.findById('6658ef9c9bd96e63ead137b2')

    let flight = await Flight.create({
        airline: 'delta',
        flightNumber: 123,
        price: 300,
        numberOfSeats: 150,
        departingAirport: airport._id,
        arrivalAirport: airport2._id,
        departureDateTime: '2024-06-01T10:00:00Z',
    })
    console.log(flight)
}

const updateFlight = async () => {
    const updatedFlight = await Flight.updateOne(
        { price: 200 },
        { price: 2000000}
    )
    const updatedAirport = await Airport.updateOne(
        { name: 'John F. Kennedy International Airport ', location: 'New York, New York', code: 'jfk' },
        { name: 'Atlantic City International Airport', location: 'New Jersey', code: 'ACY' },
    )
    console.log(updatedFlight, updatedAirport)

}

const deleteFlight = async () => {
    let deletedFlight = await Flight.deleteOne()
    let deletedAirport = await Airport.deleteOne()
    console.log(deletedFlight, deletedAirport)
}

async function main() {
    try {
        await findFlight()
        await detailFlight()
        await createFlight()
        await updateFlight()
        await deleteFlight()
    } catch (error) {
        console.log(error)
    } finally {
        await db.close()
    }
  }
  main()