const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if(error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({error: error.message})
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {

        request.token = authorization.substring(7)
    }
    else{
        request.token = null
    }
    console.log('middlewaressa hei')
    next()
}

const userExtractor = async (request, response, next) => {

    const token = request.token


    if(token) {

        const decodedToken = jwt.verify(token, config.SECRET)
        const user = await User.findById(decodedToken.id)
        request.user = user
    }

    next()

}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}