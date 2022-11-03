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
   
const mostLikes = (blogs) => {

  const authorBlogs = _.groupBy(blogs, "author");


  const authorLikes = _.mapValues(authorBlogs, (arrays) => {
    return arrays.map(x => x.likes).reduce((a,b) => {
      return a+b;
    })
  })

  const mostLikedAuthor =  Object.keys(authorLikes).reduce((a,b) => {
    return authorLikes[a] > authorLikes[b] ? a : b
  })


  const result = {
    author: mostLikedAuthor,
    likes: authorLikes[mostLikedAuthor]
  }

  return result

}

  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }