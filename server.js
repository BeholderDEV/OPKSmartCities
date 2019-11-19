const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const opn = require('opn')

const db = require('./config/db')
const User = require('./app/models/user')
const index = require('./app/routes/index')
const userRouter = require('./app/routes/userRouter')

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', index)
app.use('/api/users', userRouter)

app.listen(port, () => {
  console.log('We are live on ' + port)
  opn('http://localhost:'+ port)
})
