const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
    }

const favoriteBlog = (blogs) => {

    const mostLikes = Math.max(...blogs.map(x => x.likes))
    
    const mostLikedBlog = blogs.find(blog => blog.likes === mostLikes)

    if(blogs.length > 0){

      let response = {
        title: mostLikedBlog.title,
        author: mostLikedBlog.author,
        likes: mostLikedBlog.likes
      }
      return response
    }
    else {return null}

  }

const mostBlogs = (blogs) => {
  
  const countedAuthors = _.countBy(blogs, "author");

  const topAuthor =  Object.keys(countedAuthors).reduce((a,b) => {
      return countedAuthors[a] > countedAuthors[b] ? a : b
    })

  const result = {
    author: topAuthor,
    blogs: countedAuthors[topAuthor]
  }
return result
  
}
   


  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }