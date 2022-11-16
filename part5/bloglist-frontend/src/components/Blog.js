import '../index.css'
import { useState } from 'react'

const Blog = ({blog}) => {
  
  const [showAll, setShowAll] = useState(false)

    const hideWhenVisible = {display: showAll ? 'none' : ''}
    const showWhenVisible = {display: showAll ? '' : 'none'}

    const toggleVisibility = () => {
      setShowAll(!showAll)
  }

  return(
  <div class="blog" >
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>  
      <div style={showWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.likes} likes</p>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
      </div>  

  </div>
)}

export default Blog