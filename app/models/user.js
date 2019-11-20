const mongoose = require('../../config/db')

const WaypointSchema = {
  latitude: Number,
  longitude: Number,
  createdAt: Date
}

const UserSchema = {
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  token: mongoose.Schema.Types.ObjectId,
  type: Number,
  position: WaypointSchema
}

const User = mongoose.model('user', UserSchema)

module.exports = User
