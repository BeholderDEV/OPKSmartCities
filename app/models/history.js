const mongoose = require('../../config/db')


const WaypointSchema = {
  latitude: Number,
  longitude: Number,
  createdAt: Date
}

const HistorySchema = {
  schedule: Object,
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'bus'},
  position: WaypointSchema,
  passegerCount: Number
}

const History = mongoose.model('history', HistorySchema)

module.exports = History
