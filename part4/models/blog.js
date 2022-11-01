const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  const Blog = mongoose.model('Blog', blogSchema)
  
  blogSchema.set('toJSON', {
      transform:  (document, returnedObject) => {
          returnedObject._id = returnedObject._id.toString()
          delete returnedObject.__v
      }
  })
  
  module.exports = mongoose.model('Blog', blogSchema)
  