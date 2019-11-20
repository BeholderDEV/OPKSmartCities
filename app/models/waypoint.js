const mongoose = require('../../config/db')

const WaypointSchema = {
  latitude: Number,
  longitude: Number,
  createdAt: Date
}

const Waypoint = mongoose.model('waypoint', WaypointSchema)

module.exports = Waypoint
