exports.getSchema = async (Schema) => {
  const result = await Schema.find().lean()
  return result
}

exports.getSchemaPopulated = async (Schema, refs) => {
  const result = await Schema.find().populate(refs).lean()
  return result
}

exports.getBusSchemaWithFuzzy = async (Schema, Fuzzy) => {
  const result = await Schema.find().lean()
  //fuzzy.doTheFuzzy(result)
  return result
}

exports.getSchemaById = async (Schema, id) => {
  const result = await Schema.findById(id).lean()
  return result
}

// Poderia haver varios properties
exports.getSchemaByProperty = async (Schema, propertyName, propertyValue) => {
  let query = {}
  query[propertyName] = propertyValue
  const result = await Schema.find(query).lean()
  return result
}

exports.getDistinctSchemaAtributesByProperty = async (Schema, propertyName) => {
  const result = await Schema.find().distinct(propertyName).lean()
  return result
}

exports.getStatistics = async (Schema) => {
  let result = {}
  let users = await this.getDistinctSchemaAtributesByProperty(Schema, 'name')
  return users
}

exports.getNumberOfDocuments = async (Schema) => {
  var count = await Schema.count();
  var result= {count}
  return result;
}

exports.getEstimatedSchemaDocuments = async (Schema) => {
  const result = await Schema.estimatedDocumentCount();
  return result;
}

exports.getSchemaPaginated = async (Schema, req) => {
  let page = parseInt(req.query.page) ? parseInt(req.query.page) : 1
  let size = parseInt(req.query.size) ? parseInt(req.query.size) : 5
  let url = req.protocol + '://' + req.get('host');

  let result = {}
  result.data = await Schema.find().skip(size * (page - 1)).limit(size)

  const total = await this.getEstimatedSchemaDocuments(Schema)
  const totalPages = Math.ceil(total / size)

  result.pagination = {
    current: url + '/api/users?page=' + page + '&size=' + size,
    first: url + '/api/users?page=' + 1 + '&size=' + size,
  }

  if (page > 1) {
    result.pagination.previous = url + '/api/users?page=' + (page - 1) + '&size=' + size
  }

  if (page < totalPages) {
    result.pagination.next = url + '/api/users?page=' + (page + 1) + '&size=' + size
  }

  result.pagination.last = url + '/api/users?page=' + totalPages + '&size=' + size

  return result
}

exports.createSchema = async (Schema, info) => {
  const model = new Schema({
    ...info
  })
  const createdModel = await model.save()
  return createdModel
}

exports.createHistorySchema = async (HistSchema, BusSchema, chassi) => {
  console.log("criando historia")
  let query = {}
  query["chassi"] = chassi
  const result = await BusSchema.find(query).lean()
  
  //HistSchema.track = result[0].schedule.track
  var histmodel = new HistSchema()
  histmodel.bus = result[0]
  histmodel.position = result[0].position
  histmodel.passengersNum = result[0].passengersNum

  const createdModel = await histmodel.save()
  return createdModel
}

exports.updateWaypoint = async (Schema, chassi, modifications) => {
  const updatedModel = await Schema.updateOne({chassi: chassi}, { $set: { position: modifications} })
  return updatedModel
}

exports.addPassenger = async (Schema, chassi, number) => {
  if(number == undefined)
  {
    const updatedModel = await Schema.updateOne({chassi: chassi}, {$inc:{"passengersNum": 1}})
    return updatedModel
  }
  const updatedModel = await Schema.updateOne({chassi: chassi}, {$inc:{"passengersNum": number}})
  return updatedModel
}

exports.removePassenger = async (Schema, chassi, number) => {
  if(number == undefined)
  {
    const updatedModel = await Schema.updateOne({chassi: chassi}, {$inc:{"passengersNum": -1}})
    return updatedModel  
  }
  const updatedModel = await Schema.updateOne({chassi: chassi}, {$inc:{"passengersNum": -number}})
  return updatedModel
}

exports.updateSchema = async (Schema, id, modifications) => {
  const updatedModel = await Schema.updateOne({_id: id}, modifications)
  return updatedModel
}

 exports.insertCompilationSchema = async (Schema, id, compilation) => {
   const updatedModel = await Schema.findOneAndUpdate({user: id}, {$push: {compilations: compilation}})
   return updatedModel
 } 

exports.deleteSchema = async (Schema, id) => {
  await Schema.findByIdAndRemove(id)
}
