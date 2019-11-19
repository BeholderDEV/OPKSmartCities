const mongoose = require('../../config/db')

const BusSchema = {
  id: Number,
  number: Number,
  chassi: String,
  seats: Number,
  totalCapacity: Number,
  passengersNum: Number,
  position: Waypoint
}

const Bus = mongoose.model('Bus', BusSchema)

module.exports = Bus
