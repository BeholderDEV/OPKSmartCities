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

const ScheduleSchema = {
  _id : mongoose.Schema.Types.ObjectId,
  title: String,
  daysOfWeek: [String],
  hollidays: Boolean,
  departureTimes: [String],
  waypoints: [WaypointSchema],
  hotplaces: [String]
}

const TrackSchema = {
  name: String,
  number: Number,
  schedules: [ScheduleSchema],
  events: EventSchema
}

const BusSchema = {
  number: Number,
  chassi: String,
  seats: Number,
  totalCapacity: Number,
  passengersNum:  Number,
  position: WaypointSchema,
  schedule: {
    schedule_id: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule'},
    departureTime: String
  }  
}

const Bus = mongoose.model('bus', BusSchema)
const Track = mongoose.model('track', TrackSchema)
const Schedule = mongoose.model('schedule', ScheduleSchema)

module.exports = {Bus: Bus, Track:Track}
