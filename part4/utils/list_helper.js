
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
    console.log('IN FUNCTION.', blogs.map(x => x.likes))
    console.log('MOST LIKES.', mostLikes)

    return blogs.find(blog => blog.likes === mostLikes)
}

   


  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }