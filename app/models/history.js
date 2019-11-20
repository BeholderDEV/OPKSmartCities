const mongoose = require('../../config/db')

const HistorySchema = {
  _id: mongoose.Schema.Types.ObjectId,
  track: String,
  bus: mongoose.Schema.Types.ObjectId,
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Waypoint' },
  passegerCount: Number,
  createdAt: Date
}

const History = mongoose.model('history', HistorySchema)

module.exports = History
