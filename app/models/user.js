const mongoose = require('../../config/db')

const UserSchema = {
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  token: mongoose.Schema.Types.ObjectId,
  type: Number,
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Waypoint' }
}

const User = mongoose.model('user', UserSchema)

module.exports = User
