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
  waypoints: [WaypointSchema],
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
  passengersNum:  Number,
  position: WaypointSchema,
  schedule: ScheduleSchema
}

const Bus = mongoose.model('bus', BusSchema)
const Track = mongoose.model('track', TrackSchema)

module.exports = {Bus: Bus, Track:Track}
