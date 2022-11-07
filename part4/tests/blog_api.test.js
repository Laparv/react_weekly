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

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog has property id instead of _id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})


test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Testing out tests",
    author: "Lasse Parviainen",
    url: "http://localhost:3003/api/blogs",
    likes: 100,
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
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

  const newBlog = {
    title: "Testing out tests",
    author: "Lasse Parviainen",
    url: "http://localhost:3003/api/blogs"
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
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

afterAll(() => {
  mongoose.connection.close()
})