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
  name: String,
  number: Number,
  waypoints: [WaypointSchema],
  events: EventSchema
}

const ScheduleSchema = {
  time: String,
  track: { type: mongoose.Schema.Types.ObjectId, ref: 'track' }
}

const BusSchema = {
  number: Number,
  chassi: String,
  seats: Number,
  totalCapacity: Number,
  passengersNum:  Number,
  position: WaypointSchema,
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule' }
}

const Bus = mongoose.model('bus', BusSchema)
const Track = mongoose.model('track', TrackSchema)
const Schedule = mongoose.model('schedule', ScheduleSchema)

module.exports = {Bus: Bus, Track:Track, Schedule:Schedule}
