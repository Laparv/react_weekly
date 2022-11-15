const { findLast } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { request } = require('../app')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const config = require('../utils/config')



describe('when there is initially blogs saved', () => {

  beforeAll(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  
  })
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

  let token;
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    

    const passwordHash = await bcrypt.hash("testi", 10)
    const user = await new User({username: "name", passwordHash}).save()

    const tokenUser = {username: "name", id: user.id }
    return (token = jwt.sign(tokenUser, config.SECRET))
  })

  test('a valid blog can be added', async () => {

  
    await api
    .post('/api/blogs')
    .set("Authorization",`Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .send(helper.blogWithNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  
  })
  
  test('if no title or url respond 400', async () => {
  
    const faultyBlog = {
      author: "Lasse Parviainen"
    }
  
    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(faultyBlog)
    .expect(400)
  })

  
})

describe("deletion of a blog", () => {
  let token = null;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ username: "name", passwordHash }).save();

    const userForToken = { username: "name", id: user.id };
    token = jwt.sign(userForToken, config.SECRET);



    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(helper.newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    return token;
  });

  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await Blog.find({}).populate("user")
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({}).populate("user")
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

  })

  test("fails with 401 if no token", async () => {
    const blogsAtStart = await Blog.find({}).populate("user")
    const blogToDelete = blogsAtStart[0];

    token = null;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401)


    const blogsAtEnd = await Blog.find({}).populate("user")
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain(blogToDelete.title)
  })


});

afterAll(() => {
  mongoose.connection.close()
})