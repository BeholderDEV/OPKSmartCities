const mongoose = require('../../config/db')


const WaypointSchema = {
  latitude: Number,
  longitude: Number,
  createdAt: Date
}

const HistorySchema = {
  track: String,
  bus: mongoose.Schema.Types.ObjectId,
  position: WaypointSchema,
  passegerCount: Number
}

const History = mongoose.model('history', HistorySchema)

module.exports = History
