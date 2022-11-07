const { findLast } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

})

describe('when there is initially blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('blog has property id instead of _id', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  })
})



describe('when posting a new blog', () => {

  test('a valid blog can be added', async () => {
    
  
    await api
    .post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'Testing out tests'
    )
  })
  
  test('if no value given to likes it amounts to 0', async () => {
  
    await api
    .post('/api/blogs')
    .send(helper.blogWithNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body[helper.initialBlogs.length].likes).toBe(0)
  
  })
  
  test('if no title or url respond 400', async () => {
  
    const faultyBlog = {
      author: "Lasse Parviainen"
    }
  
    await api
    .post('/api/blogs')
    .send(faultyBlog)
    .expect(400)
  })
  
})

test('blog deleted with id', async () => {

    const response = await helper.blogsInDb()
    console.log(response)

    const deletionId = response[0].id

    await api
    .delete(`/api/blogs/${deletionId}`)
    .expect(204)

   const  blogsLeft = await helper.blogsInDb()

  expect(blogsLeft.length).toBe(helper.initialBlogs.length -1)
 
})

afterAll(() => {
  mongoose.connection.close()
})