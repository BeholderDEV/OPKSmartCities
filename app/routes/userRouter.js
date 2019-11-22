const express = require('express')
const asyncHandler = require('../utils/asyncHandler')
const dbController = require('../controllers/dbController')
const User = require('../models/user')
const requestIp = require('request-ip')

const router = express.Router()

router.get('/', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getSchema, [User, req])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/count', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getNumberOfDocuments, [User])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/distinct/:atributo', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getDistinctSchemaAtributesByProperty, [User, req.params.atributo])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/statistics', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getUserStatistics, [User])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/:prop/:value', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getSchemaByProperty, [User, req.params.prop, req.params.value])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.get('/:user', async (req, res) => {
  const result = await asyncHandler.handleAsyncMethod(dbController.getSchemaByProperty, [User, 'user', req.params.user])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.post('/', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)
  const result = await asyncHandler.handleAsyncMethod(dbController.createSchema, [User, req.body])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

router.put('/:id', async (req, res) => {
  req.body.extIp = requestIp.getClientIp(req)
  const result = await asyncHandler.handleAsyncMethod(dbController.updateSchema, [User, req.params.id, req.body])
  result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
})

 router.put('/compilation/:id', async (req, res) => {
   req.body.extIp = requestIp.getClientIp(req)
   const result = await asyncHandler.handleAsyncMethod(dbController.insertCompilationSchema, [User, req.params.id, req.body])
   result !== 'error' ? res.send(result) : res.send({'error': 'An error has occurred'})
 })

module.exports = router
