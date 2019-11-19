const mongoose = require('../../config/db')


const Waypoint = {
   id: Number,
   latitude: Number,
   longitude: Number,
   createdAt: Date
}

const UserSchema = {
  id: Number,
  name: String,
  token: uuidv4,
  type: Number,
  position: Waypoint
}

const User = mongoose.model('User', UserSchema)

module.exports = User
