const mongoose = require('../../config/db')


const WaypointSchema = {
  latitude: Number,
  longitude: Number,
  createdAt: Date
}

const HistorySchema = {
  _id: mongoose.Schema.Types.ObjectId,
  track: String,
  bus: mongoose.Schema.Types.ObjectId,
  position: WaypointSchema,
  passegerCount: Number,
  createdAt: Date
}

const History = mongoose.model('history', HistorySchema)

module.exports = History
