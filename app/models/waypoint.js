const mongoose = require('../../config/db')

const WaypointSchema = {
  id: Number,
  latitude: Number,
  longitude: Number,
  createdAt: Date
}

const Bus = mongoose.model('Waypoint', WaypointSchema)

module.exports = Waypoint
