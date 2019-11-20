const mongoose = require('../../config/db')

const WaypointSchema = {
  latitude: Number,
  longitude: Number,
  createdAt: Date
}

const EventSchema = {
  category: String,
  createdAt: Date
}

const TrackSchema = {
  title: String,
  waypoints: WaypointSchema,
  events: EventSchema
}

const ScheduleSchema = {
  time: Date,
  track: TrackSchema
}

const BusSchema = {
  number: Number,
  chassi: String,
  seats: Number,
  totalCapacity: Number,
  passengersNum: Number,
  position: {type: mongoose.Schema.Types.ObjectId, ref: 'Waypoint'},
  schedule: ScheduleSchema
}

const Bus = mongoose.model('bus', BusSchema)

module.exports = Bus
