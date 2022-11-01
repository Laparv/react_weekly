const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


const mongoUrl = config.MONGODB_URI

logger.info('connecting to', mongoUrl)
mongoose.connect(mongoUrl).then(result => {
    logger.info('connected to MongoDB')
}).catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
})

app.get('/', (request, response)=> {
    response.writeHead(200,{'Content-Type': 'text/plain'})
    response.end('Blog app')
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app;


