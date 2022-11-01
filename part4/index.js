require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')



app.use(cors())
app.use(express.json())

app.get('/', (request, response)=> {
    response.writeHead(200,{'Content-Type': 'text/plain'})
    response.end('Blog app')
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  console.log(request.body)

  blog
    .save()
    .then(result => {
        console.log(result)
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})