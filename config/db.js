const mongoose = require('mongoose')

mongoose.connect('mongodb://smartbusao:busao123456@ds263791.mlab.com:63791/smart-busao', () => {
  console.log('mongodb connected')
})

module.exports = mongoose
