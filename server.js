const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const opn = require('opn')

const db = require('./config/db')
const User = require('./app/models/user')
const Bus = require('./app/models/bus')
const History = require('./app/models/history')
const index = require('./app/routes/index')
const userRouter = require('./app/routes/userRouter')
const busRouter = require('./app/routes/busRouter')
const historyRouter = require('./app/routes/busRouter')
const trackRouter = require('./app/routes/trackRouter')

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', index)
app.use('/api/users', userRouter)
app.use('/api/buses', busRouter)
app.use('/api/history', historyRouter)
app.use('/api/tracks', trackRouter)

app.listen(port, () => {
  console.log('We are live on ' + port)
  //opn('http://localhost:'+ port)
})
