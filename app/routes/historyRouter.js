const express = require('express')
const asyncHandler = require('../utils/asyncHandler')
const dbController = require('../controllers/dbController')
const History = require('../models/history')
const populateHandles = require('../utils/populateHandler')
const Bus = require('../models/bus')
const requestIp = require('request-ip')

const router = express.Router()

router.get('/', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getSchemaPopulated, [History, "bus"])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/byTrack', async (req, res) => {
  const resultHist = await asyncHandler.handleAsyncMethod(dbController.getSchemaPopulated, [History, "bus"])
  const resultTrack = await asyncHandler.handleAsyncMethod(dbController.getSchema, [Bus.Track])
  result = populateHandles.populateHistTracks(resultHist, resultTrack)
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/distinct/:atributo', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getDistinctSchemaAtributesByProperty, [History, req.params.atributo])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/statistics', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getStatistics, [History])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/:id', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getSchemaByProperty, [History, '_id', req.params.id])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/:prop/:value', async (req, res) => {
  const params = req.params.prop.split('&')
  const values = req.params.value.split('&')
  const result = await asyncHandler.handleAsyncMethod(dbController.getSchemaByMultipleProperty, [History, params, values])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.post('/', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)
  const result = await asyncHandler.handleAsyncMethod(dbController.createSchema, [History, req.body])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.put('/:id', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)
  const result = await asyncHandler.handleAsyncMethod(dbController.updateSchema, [History, req.params.id, req.body])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

 router.put('/compilation/:id', async (req, res) => {
   req.body.extIp = requestIp.getClientIp(req)
   const result = await asyncHandler.handleAsyncMethod(dbController.insertCompilationSchema, [History, req.params.id, req.body])
   result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
 })

 router.delete('/:id', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.deleteSchema, [History, req.params.id])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
 })

module.exports = router
