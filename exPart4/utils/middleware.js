const logger = require('./logger')
const jwt = require('jsonwebtoken')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  let currentToken = null
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    currentToken = authorization.replace('Bearer ', '')
  }
  request.token = currentToken
  next()
}

const userExtractor = (request, response, next) => {
  let currentToken = request.token
  if (currentToken) {
    const decodedToken = jwt.verify(currentToken, process.env.SECRET)
    request.user = {
      id: decodedToken.id,
      username: decodedToken.username
    }
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  // console.log('error.message:')
  //console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    return response.status(500).json({ error: 'JsonWebTokenError', message: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler
}