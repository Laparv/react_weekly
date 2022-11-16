import '../index.css'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  
  const [showAll, setShowAll] = useState(false)
  const [newLikes, setNewLikes] = useState(blog.likes)

    const hideWhenVisible = {display: showAll ? 'none' : ''}
    const showWhenVisible = {display: showAll ? '' : 'none'}

    const toggleVisibility = () => {
      setShowAll(!showAll)
  }


  const updateBlog = (event) => {

    const blogObject = {
      user: blog.user.id,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    
    const changedLikes = {...blogObject, likes: newLikes + 1}

    blogService.update(blog.id, changedLikes).then(setNewLikes(changedLikes.likes))
  }


  return(
  <div className="blog" >
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>  
      <div style={showWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p>{newLikes} likes <button onClick={updateBlog}>like</button></p> 
        <p>{blog.url}</p>
        <p>{blog.author}</p>
        <p>{blog.user.name}</p>
      </div>  

  </div>
)}

export default Blog