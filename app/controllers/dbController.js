exports.getSchema = async (Schema) => {
  const result = await Schema.find().lean()
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

exports.getUserStatistics = async (Schema) => {
  let result = {}
  let users = await this.getDistinctSchemaAtributesByProperty(Schema, 'name') 

  return users
}

exports.getBusSchemaPaginated = async (Schema, req) => {
  const result = await Schema.find()
  return result
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

exports.updateSchema = async (Schema, id, modifications) => {
  const updatedModel = await Schema.update({_id: id}, modifications)
  return updatedModel
}

 exports.insertCompilationSchema = async (Schema, id, compilation) => {
   const updatedModel = await Schema.findOneAndUpdate({user: id}, {$push: {compilations: compilation}})
   return updatedModel
 } 

exports.deleteSchema = async (Schema, id) => {
  await Schema.findByIdAndRemove(id)
}
