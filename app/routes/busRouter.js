const express = require('express')
const asyncHandler = require('../utils/asyncHandler')
const dbController = require('../controllers/dbController')
const Bus = require('../models/bus')
const History = require('../models/history')
const requestIp = require('request-ip')


const router = express.Router()

router.get('/', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getSchema, [Bus.Bus, req])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/count', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getNumberOfDocuments, [Bus.Bus])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/fbus', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getBusSchemaWithFuzzy, [Bus.Bus, req])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/distinct/:atributo', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getDistinctSchemaAtributesByProperty, [Bus.Bus, req.params.atributo])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/statistics', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getBusStatistics, [Bus.Bus])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/:prop/:value', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getSchemaByProperty, [Bus.Bus, req.params.prop, req.params.value])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/:id', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getSchemaByProperty, [Bus.Bus, '_id', req.params.id])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/:chassi', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getSchemaByProperty, [Bus.Bus, 'chassi', req.params.chassi])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.post('/', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)
  const result = await asyncHandler.handleAsyncMethod(dbController.createSchema, [Bus.Bus, req.body])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.put('/:id', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)
  const result = await asyncHandler.handleAsyncMethod(dbController.updateSchema, [Bus.Bus, req.params.id, req.body])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.put('/compilation/:id', async (req, res) => {
   req.body.extIp = requestIp.getClientIp(req)
   const result = await asyncHandler.handleAsyncMethod(dbController.insertCompilationSchema, [Bus.Bus, req.params.id, req.body])
   result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
 })

 router.put('/updateWaypoint/:chassi', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)  
  const result = await asyncHandler.handleAsyncMethod(dbController.updateWaypoint, [Bus.Bus, req.params.chassi, req.body])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
  await asyncHandler.handleAsyncMethod(dbController.createHistorySchema, [History, Bus.Bus, req.params.chassi])
})

router.put('/addPassenger/:chassi', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)
  const result = await asyncHandler.handleAsyncMethod(dbController.addPassenger, [Bus.Bus, req.params.chassi])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.put('/removePassenger/:chassi', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)
  const result = await asyncHandler.handleAsyncMethod(dbController.removePassenger, [Bus.Bus, req.params.chassi])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.put('/addPassenger/:chassi/:number', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)
  const result = await asyncHandler.handleAsyncMethod(dbController.addPassenger, [Bus.Bus, req.params.chassi, req.params.number])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.put('/removePassenger/:chassi/:number', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)
  const result = await asyncHandler.handleAsyncMethod(dbController.removePassenger, [Bus.Bus, req.params.chassi, req.params.number])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

module.exports = router
