const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { usersInDb } = require('../tests/test_helper')



blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
  .find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)

})


blogsRouter.post('/', async (request, response) => {

  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  
  const user = request.user


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body
  

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.status(200).json()
})

blogsRouter.delete('/:id', async (request, response) => {


  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if(blog.user.toString() === user.id){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }

  else if(blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({error: 'Cannot delete with wrong user'})
  }
  
})

module.exports = blogsRouter;